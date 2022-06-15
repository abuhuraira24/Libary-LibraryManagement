const {UserInputError} = require('apollo-server-express')

const Post = require('../../model/Post');

const User = require('../../model/User');


const AuthChecker = require('../../utils/auth-checker');

module.exports = {
   Mutation : {
    async createComment(_, {postId, body}, context){
       
        const {username,id, firstName, lastName} =  AuthChecker(context);
        

        if (body.trim() === '') {
            throw new UserInputError('Empty comment', {
              errors: {
                body: 'Comment body must not empty'
              }
            });
          }
        const post = await Post.findById(postId);

        if(post){
            
            console.log(post)
            post.comments.unshift({
                body,
                username : firstName + " " + lastName,
                userId : id,
                createdAt: new Date().toISOString()
              });
              await post.save();

          return post
          
        }else throw new UserInputError("Post Not Found!");
    }
   } 
}