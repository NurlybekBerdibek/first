const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullname: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    city: {type: DataTypes.STRING},
    dob: {type: DataTypes.DATE},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
})

const Offer = sequelize.define('offer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    offerName: {type: DataTypes.STRING},
    offerDescription: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING, allowNull: false},
    created_by: {type: DataTypes.STRING},
    created_at: {type: DataTypes.DATE}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    categoryName: {type: DataTypes.STRING},
    offerID: {type: DataTypes.INTEGER},
    postID: {type: DataTypes.INTEGER}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    postName: {type: DataTypes.STRING},
    postDescription: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull: false},
    likes:{type: DataTypes.STRING},
    comments:{ type: DataTypes.STRING},
    posted_by: {type: DataTypes.STRING}
})


const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    profile_id: {type: DataTypes.INTEGER},
    created_at: {type: DataTypes.DATE}
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatName: {type: DataTypes.STRING},
    latestMessage: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.STRING}
})

User.hasMany(Offer, { foreignKey: 'username' });
Offer.belongsTo(User);

Offer.belongsTo(Category);
Category.hasMany(Offer);

Offer.belongsTo(Post);
Post.hasMany(Offer);



module.exports = {
    User,
    Offer,
    Category, 
    Post,
    
    Review,
    Chat
}





