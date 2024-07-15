const db = require('../database/database');
const heap = require('../heap/heapUtil');
const scores = require('../heap/score').scores;

var currentMatchAdding = {
    '5fd0b52232ec92273c8e0afa': null,
    '5fdb51c574c942369c7f6582': null,
    '5fdb53565cd8d843b43ae84e': null,
    '5fdb53807524a04be84a44f3': null,
};

/*
db.getUser('5fd0b52232ec92273c8e0afa')
    .then(user => {
        let date = new Date().getTime(),
            seenPosts = ['5fdbc94a1355ef43fcade379'],
            k = 2;
        let recommended_users = ['5fdb51c574c942369c7f6582','5fdb53565cd8d843b43ae84e']
        db.getPostsForUser(recommended_users, new Date(date-1000*3600*24*2), seenPosts)
        .then(posts => {
            let result = []
                k = posts.length > 5 ? 5 : posts.length;   
            for(let i=0; i<k; i++){
                result.push({
                    status: posts[i].status,
                    id: posts[i]._id.toString(),
                    author_id: posts[i].author_id,
                    imageUrl: posts[i].image_path,
                    likes: posts[i].likes,
                });
            }
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    })
*/
let currentTime = new Date(),
    yearInMilis = 1000*3600*24*365;
let date = [new Date(currentTime.getTime() - 100*yearInMilis), new Date(currentTime.getTime() - 0*yearInMilis)];
db.getUsersBasedOnInfo('kh', date, [0,1], [])
.then(users => console.log(users));

