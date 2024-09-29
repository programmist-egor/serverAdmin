import React from 'react';
import {Document, Page, Text, View, Image, StyleSheet, Font} from '@react-pdf/renderer';
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import {formatMoney} from "../utils/formating-money";
import signatureDirector from "../assets/image/подпись.png"


const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
    },
    page: {
        display: "flex",
        flexDirection: "column",
    },
    header: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableHeader2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 0,
    },
    tableColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: 50,
        width: 400,
    },
    tableColumn2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: 50,
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        width: 70,
    },
    tableColumn3: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: 50,
        width: 250,

    },
    tableColumn4: {
        display: "flex",
        flexDirection: "column",
        margin: 10
    },
    tableRowSignatureSB: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tableRowSB: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: 319,
        height: 20,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableRowFS: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    tableRow1: {
        paddingRight: 10,
        borderStyle: "solid",
        borderBottomWidth: 0,
        borderRightWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableRow2: {
        paddingLeft: 10,
    },
    selectionInvoice: {
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: 'RobotoBold',
        paddingBottom: 10,
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
    },
    section: {
        marginTop: 40,
        marginBottom: 10,
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tableFavor: {
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: 2,
        marginBottom: 20
    },
    tableRowFavor: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    textFavor: {
        margin: "auto",
        marginTop: 5,
        fontSize: 11,
        fontWeight: "bold",
        fontFamily: 'RobotoRegular',
    },
    textFavor1: {
        fontSize: 11,
        fontFamily: 'RobotoRegular',

    },
    tableRowFavor1: {
        width: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderBottomWidth: 0,
    },
    tableRowFavor2: {
        width: "80%",
        paddingLeft: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderBottomWidth: 0,
    },
    tableRowFavor3: {
        width: "15%",
        paddingLeft: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    totalRow: {
        display: "flex",
        flexDirection: "row",
        borderTopWidth: 1,
    },
    totalCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
    },
    text12: {
        fontSize: 12,
        fontFamily: 'RobotoRegular',
    },
    text16: {
        fontSize: 12,
        fontFamily: 'RobotoRegular',
    },
    text16Bold: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: 'RobotoRegular',
    },
    sealImage: {
        position: "absolute",
        width: 150,
        height: 150,
    },
    columnFSFS: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rowFSSB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
});

const InvoiceAccountA4 = ({invoiceData}) => {
    console.log("invoiceData", invoiceData);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.tableHeader}>
                            <View style={styles.tableColumn}>
                                <Text style={styles.text16}>{invoiceData.bank.name}</Text>
                                <Text style={styles.text12}>Банк получателя </Text>
                            </View>
                            <View style={styles.tableColumn2}>
                                <Text style={styles.text16}>БИК</Text>
                                {/*<Text style={styles.text16}>Сч. №</Text>*/}
                            </View>
                            <View style={styles.tableColumn3}>
                                <Text style={styles.text16}>{invoiceData.bank.bik}</Text>
                                <Text style={styles.text16}>{invoiceData.bank.amount}</Text>
                            </View>
                        </View>
                        <View style={styles.tableHeader2}>
                            <View style={styles.tableColumn}>
                                <View style={styles.tableRowSB}>
                                    <View style={styles.tableRow1}>
                                        <Text style={styles.text16}>ИНН {invoiceData.bank.inn}</Text>
                                    </View>
                                    <View style={styles.tableRow2}>
                                        <Text style={styles.text16}>КПП {invoiceData.bank.kpp}</Text>
                                    </View>
                                </View>
                                <View style={styles.tableRowFS}>
                                    <Text style={styles.text12}>Получатель</Text>
                                    <Text style={styles.text16}>&emsp; {invoiceData.customer.name}</Text>
                                </View>
                            </View>
                            <View style={styles.tableColumn2}>
                                {/*<Text style={styles.text16}>Сч. №</Text>*/}
                            </View>
                            <View style={styles.tableColumn3}>
                                <Text style={styles.text16}>{invoiceData.bank.amount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.selectionInvoice}>
                        <Text>Счет на оплату №: {invoiceData.invoiceNumber} от {invoiceData.date}</Text>
                    </View>
                    <View style={styles.tableColumn4}>
                        <Text style={styles.text16Bold}>Покупатель: {invoiceData.customer.name},
                            ИНН {invoiceData.customer.inn},
                            КПП {invoiceData.customer.inn}, {invoiceData.customer.address}</Text>
                        <Text style={styles.text16Bold}>Поставщик: {invoiceData.provider.name},
                            ИНН {invoiceData.provider.inn},
                            КПП {invoiceData.provider.inn}, {invoiceData.provider.address}</Text>
                    </View>

                    <View>
                        <View style={styles.tableFavor}>
                            <View style={styles.tableRowFavor}>
                                <View style={styles.tableRowFavor1}>
                                    <Text style={styles.textFavor}>№</Text>
                                </View>
                                <View style={styles.tableRowFavor2}>
                                    <Text style={styles.textFavor}>Наименование услуги</Text>
                                </View>
                                <View style={styles.tableRowFavor3}>
                                    <Text style={styles.textFavor}>Сумма</Text>
                                </View>
                            </View>
                            {invoiceData.services.map((service, index) => (
                                <View style={styles.tableRowFavor} key={index}>
                                    <View style={styles.tableRowFavor1}>
                                        <Text style={styles.textFavor1}>{service.id}</Text>
                                    </View>
                                    <View style={styles.tableRowFavor2}>
                                        <Text style={styles.textFavor1}>{service.name}</Text>
                                    </View>
                                    <View style={styles.tableRowFavor3}>
                                        <Text style={styles.textFavor1}>{formatMoney(service.amount)} ₽</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.selectionInvoice}>
                        <Text style={styles.text16Bold}>Сумма к оплате: {formatMoney(invoiceData.totalAmount)}  ₽ ({invoiceData.totalAmountWords})</Text>
                    </View>
                    <View style={[styles.rowFSSB, {marginTop: 20}]}>
                        <View style={[styles.columnFSFS, {width: "50%"}]}>
                            <Text style={[styles.textFavor1, {marginBottom: 10}]}>Бухгалтер</Text>
                            <Text style={[styles.textFavor1]}>__________________( {invoiceData.accountName === null ? "" : invoiceData.accountName.name} )</Text>
                        </View>
                        <View style={[styles.columnFSFS, {width: "50%"}]}>
                            <Text style={[styles.textFavor1, {marginBottom: 10}]}>Генеральный директор</Text>
                            <Text style={[styles.textFavor1]}>__________________({invoiceData.supervisor})</Text>
                        </View>
                    </View>


                </View>
                <Image
                    style={[styles.sealImage, {marginLeft: 200, marginTop: 300}]}
                    src={invoiceData?.accountName.sealImage}
                />
                <Image
                    style={[styles.sealImage, {marginLeft: 300, marginTop: 310}]}
                    src={signatureDirector}
                />
                <Image
                    style={[styles.sealImage, { marginTop: 280}]}
                    src={invoiceData?.accountName.signatureImage}
                />
            </Page>
        </Document>
    )
};

export default InvoiceAccountA4;

Font.register({
    family: 'RobotoBold',
    src: RobotoBold
});

Font.register({
    family: 'RobotoRegular',
    src: RobotoRegular
});