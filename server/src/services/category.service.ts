import CategoryModel from '@/models/category.model.js'

class CategoryService {
    public static async getAllCategories() {
        const categories = await CategoryModel.find()
        return categories
    }
}

export default CategoryService