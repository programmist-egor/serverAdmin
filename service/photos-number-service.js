import PhotoNumberObjectExtranet from "../models/photo-number-object-model.js";

class PhotosNumberService {
    async getAllPhotosCategoryNumber(categoryId) {
        return await PhotoNumberObjectExtranet.findAll({where: {categoryId: categoryId}});
    }
    async getAllPhotosNumber(numberId) {
        const result = await PhotoNumberObjectExtranet.findAll({where: {numberId: numberId}});
        return result
    }
    async createNumberPhotos(numberPhotos) {
        return await PhotoNumberObjectExtranet.create(numberPhotos)
    }

    async deleteNumberPhoto(idImg) {
        const result = await PhotoNumberObjectExtranet.destroy({where: {idImg: idImg}});
        if (result === 1) {
            return true
        }
    }
    async deleteAllNumberPhotos(numberId) {
        const result = await PhotoNumberObjectExtranet.destroy({where: {numberId: numberId}});
        if (result === 1) {
            return true
        }
    }
    async deleteAllCategoryNumberPhotos(categoryId) {
        const result = await PhotoNumberObjectExtranet.destroy({where: {categoryId: categoryId}});
        if (result === 1) {
            return true
        }
    }

}

export default new PhotosNumberService()


