import ApiError from "../exceptions/api-error.js";
import Statistic from "../models/statistic-model.js";
import Settlement from "../models/settlement-model.js";
import StatisticNumbers from "../models/statistic-numbers-model.js";
import BookingExtranet from "../models/booking-extranet-model.js";
import {
    filterCurrentMonth,
    filterCurrentYear,
    filterLastMonth,
    filterLastYear
} from "../utils/filteredBookingForDate.js";
import ObjectsExtranet from "../models/objects-extranet-model.js";
import UsersYooking from "../models/users-yooking-model.js";
import {parseJSONPropertiesInArray} from "../utils/json-parse-object.js";
import NumberExtranet from "../models/numbers-model.js";
import {v4 as uuidv4} from "uuid";

class StatisticService {
    async getStatistic() {
        return await Statistic.findOne({where: {statsId: 1}})
    }

    //Инициализация статистики
    async initStatistic() {
        const arrayUnique = []
        //Статистика
        const stats = await Statistic.findOne({where: {statsId: 1}})

        const allBooking = await BookingExtranet.findAll()
        const allObject = await ObjectsExtranet.findAll()
        const allUsers = await UsersYooking.findAll()
        const allNumbers = await NumberExtranet.findAll()

        const parseUsers = allUsers.map(obj => {
            return JSON.parse(obj.bookingList)
        })

        const filterUsers = parseUsers.filter(obj => obj.length > 0)

        const filter = filterUsers.map(obj => {
            if (obj.length > 0) {
                // arrayUnique.push(obj[0])
                return obj[0]
            }
        })


        const currentMonthUniqueArmor = filterCurrentMonth(filter)
        const lastMonthUniqueArmor = filterLastMonth(filter)
        const currentYearUniqueArmor = filterCurrentYear(filter)
        const lastYearUniqueArmor = filterLastYear(filter)

        const currentMonthObject = filterCurrentMonth(allObject)
        const lastMonthObject = filterLastMonth(allObject)
        const currentYearObject = filterCurrentYear(allObject)
        const lastYearObject = filterLastYear(allObject)

        const currentMonthBooking = filterCurrentMonth(allBooking)
        const lastMonthBooking = filterLastMonth(allBooking)
        const currentYearBooking = filterCurrentYear(allBooking)
        const lastYearBooking = filterLastYear(allBooking)

        const currentMonthIncome = () => {
            return currentMonthBooking.reduce((acc, obj) => {
                const amount = parseFloat(obj.amount.replace(/\s/g, ''));
                const amountCommission = amount * 0.05;
                return acc + (isNaN(amountCommission) ? 0 : amountCommission);
            }, 0);
        }

        const lastMonthIncome = () => {
            return lastMonthBooking.reduce((acc, obj) => {
                const amount = parseFloat(obj.amount.replace(/\s/g, ''));
                const amountCommission = amount * 0.05;
                return acc + (isNaN(amountCommission) ? 0 : amountCommission);
            }, 0);
        }

        const currentYearIncome = () => {
            return currentYearBooking.reduce((acc, obj) => {
                const amount = parseFloat(obj.amount.replace(/\s/g, ''));
                const amountCommission = amount * 0.05;
                return acc + (isNaN(amountCommission) ? 0 : amountCommission);
            }, 0);
        }

        const lastYearIncome = () => {
            return lastYearBooking.reduce((acc, obj) => {
                const amount = parseFloat(obj.amount.replace(/\s/g, ''));
                const amountCommission = amount * 0.05;
                return acc + (isNaN(amountCommission) ? 0 : amountCommission);
            }, 0);
        }




        // const result = JSON.parse(stats.statisticData)
        for (const booking of currentMonthBooking) {
            const {hotelId, amount, typePayment, nameObject, id} = booking;
            const parseTypePayment = JSON.parse(typePayment);
            const amountParse = parseFloat(amount.replace(/\s/g, ''))
            const amountCommission = parseFloat(amount.replace(/\s/g, '')) * 0.05;

            // Поиск объекта в Settlement
            let settlement = await Settlement.findOne({where: {idObject: hotelId}});
            if (settlement) {
                // Проверка, если бронь уже существует в idBooking
                const idBookingList = JSON.parse(settlement.idBooking || '[]');
                if (!idBookingList.includes(id)) {
                    // Обновление существующего объекта
                    if (parseTypePayment.name === 'Через сервис') {
                        settlement.serviceAmount += amountParse - amountCommission; // Убираем пробелы и конвертируем в число
                    } else if (parseTypePayment.name === 'В отеле') {
                        settlement.partnerAmount += amountCommission;
                    }
                    // Добавляем id бронирования в idBooking
                    idBookingList.push(id);
                    settlement.idBooking = JSON.stringify(idBookingList);
                    await settlement.save();
                }
            } else {
                // Добавление нового объекта
                const newSettlement = {
                    idObject: hotelId,
                    name: nameObject,
                    checked: 0,
                    partnerAmount: parseTypePayment.name === 'В отеле' ? amountCommission : 0,
                    serviceAmount: parseTypePayment.name === 'Через сервис' ? amountParse - amountCommission : 0,
                    idBooking: JSON.stringify([id]) // Создаем новый массив с текущим id
                };
                await Settlement.create(newSettlement);
            }
        }

        // Filter bookings based on bookingList in allNumbers
        const bookingsWithNumbers = allNumbers.flatMap((number) => {
            const bookingListParse = JSON.parse(number.bookingList)
            const bookingIds = bookingListParse.map((booking) => booking.id);
            return currentMonthBooking.filter((booking) => bookingIds.includes(booking.id));
        });


        // // Sum bookings and update StatisticNumbers
        for (const booking of bookingsWithNumbers) {
            const {hotelId, amount, nameObject, id, nameNumber, categoryName} = booking;
            const amountParsed = parseFloat(amount.replace(/\s/g, ''));

            // Find corresponding entry in StatisticNumbers
            let statisticNumber = await StatisticNumbers.findOne({where: {uid: hotelId}});

            if (statisticNumber) {
                // Проверка, если бронь уже существует в idBooking
                const idBookingList = JSON.parse(statisticNumber.idBooking || '[]');

                // Update existing entry
                if (!idBookingList.includes(id)) {
                    statisticNumber.countBooking += 1;
                    statisticNumber.amount += amountParsed;
                    // Добавляем id бронирования в idBooking
                    idBookingList.push(id);
                    statisticNumber.idBooking = JSON.stringify(idBookingList);
                    await statisticNumber.save();
                } else {
                    console.log("Бронь уже добавлена!")
                }
            } else {
                const newStatisticNumbers =
                    {
                        id: uuidv4(),
                        uid: hotelId,
                        name: nameObject,
                        nameNumbers: nameNumber,
                        typeNumbers: categoryName,
                        countBooking: 1,
                        amount: amountParsed,
                        idBooking: JSON.stringify([id])
                    }

                // Create new entry if not found
                await StatisticNumbers.create(newStatisticNumbers);
            }
        }

        // Обновление данных в таблице Settlement


        const updateStatistic = {
            incomeMonthCurrent: currentMonthIncome(),
            incomeMonthLast: lastMonthIncome(),
            numberOfArmorCurrent: currentMonthBooking.length,
            numberOfArmorMonthLast: lastMonthBooking.length,
            uniqueArmorMonthCurrent: currentMonthUniqueArmor.length,
            uniqueArmorMonthLast: lastMonthUniqueArmor.length,
            objectMonthCurrent: currentMonthObject.length,
            objectMonthLast: lastMonthObject.length,
            incomeYearCurrent: currentYearIncome(),
            incomeYearLast: lastYearIncome(),
            numberOfArmorYearCurrent: currentYearBooking.length,
            numberOfArmorYearLast: lastYearBooking.length,
            uniqueArmorYearCurrent: currentYearUniqueArmor.length,
            uniqueArmorYearLast: lastYearUniqueArmor.length,
            objectYearCurrent: currentYearObject.length,
            objectYearLast: lastYearObject.length,
        }

        stats.statisticData = JSON.stringify(updateStatistic)
        await stats.save()

        // console.log("result",result)
        // console.log("currentMonth",currentMonth)
        // console.log("lastMonth",lastMonth.length)
    }

    async getSettlement() {
        return await Settlement.findAll()
    }

    async getSettlementNumber(uid) {
        const numbers = await StatisticNumbers.findAll({where: {uid: uid}});
        if (!numbers || numbers.length === 0) {
            throw new ApiError.BadRequest("Нет таких номеров")
        }
        return numbers;
    }

}

export default new StatisticService()


