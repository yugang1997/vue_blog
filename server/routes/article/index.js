const express = require('express');
const article = require('../../db/article');
const articleInfo = require('../../db/articleInfo');

let router = express.Router();

/*获取单篇文章信息*/
router.post('/', (req, res) => {
    let { _id } = req.body;
    /*判断是否存在_id*/
    if (!_id) {
        res.send({
            code: 1,
            msg: "请传入要查询的文章id"
        });
        return;
    }
    /*通过id查文章*/
    article.findById(_id).then(data => {
        /*判断data是否有值*/
        if (data) {
            article.updateOne({ _id }, { $inc: { pv: 1 } }).then(() => {});
            res.send({
                code: 0,
                msg: "查询成功",
                data
            })
        } else {
            //没有文章
            res.send({
                code: 1,
                msg: "没有对应的文章"
            })
        }
    }).catch(() => {
        res.send({
            code: 4,
            msg: "服务器错误"
        });
    });
});
/*延伸阅读*/
router.post('/extend', (req, res) => {
    let { tag } = req.body;
    if (!tag) {
        res.send({
            code: 1,
            msg: "请传入要查询的tag"
        })
    }
    article.find({ tag }, { _id: 1, title: 1 }, { skip: 0, limit: 2, sort: { pv: -1 } }).then(data => {
        if (data) {
            res.send({
                code: 0,
                msg: "查询成功",
                data: data
            })
        } else {
            res.send({
                code: 2,
                msg: "没有对应的文章",
                data: []
            })
        }
    }).catch(() => {
        res.send({
            code: 4,
            msg: "服务器错误",
            data: []
        })
    });
});

/*获取文章Info*/
router.post('/getInfo', (req, res) => {
    articleInfo.findOne({}, { _id: 0, __v: 0 })
        .then(data => {
            res.send({
                code: 0,
                mag: '请求成功',
                data
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: '服务器错误',
                data: null
            })
        })
});

/*获取热门文章*/
router.post('/getHot', (req, res) => {
    let { limit } = req.body;
    article.find({}, { __v: 0 }, { sort: { pv: -1 }, skip: 0, limit })
        .then(data => {
            /*console.log(data);*/
            res.send({
                code: 0,
                data
            });
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: "服务器错误",
                data: null
            });
        })
});

/*获取文章展示内容*/
router.post('/getShow', (req, res) => {
    /*前端传过来的数据，解构*/
    let { skip, limit, tag } = req.body;
    /*判断tag是否存在*/
    let options = tag ? { tag } : {};
    article.find(options, { __v: 0 }, { skip, limit, sort: { pv: -1 } })
        .then((data) => {
            res.send({
                code: 0,
                data,
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: '服务器错误',
                data: null,
            })
        })
});

/*文章搜索*/
router.post('/search', (req, res) => {
    let { keyWords } = req.body;
    /*判断keyWords是否存在*/
    if (!keyWords) {
        res.send({
            code: 1,
            msg: "请输入搜索的关键词",
            data: []
        });
        return;
    }
    /*查找*/
    let reg = new RegExp(keyWords, 'i');
    /*按照title或者tag查询*/
    article.find({ $or: [{ title: reg }, { tag: reg }] }, { _id: 1, title: 1 }, { skip: 0, limit: 5, sort: { pv: -1 } }).then(data => {
        res.send({
            code: 0,
            msg: "查找成功",
            data
        })
    }).catch(() => {
        res.send({
            code: 4,
            msg: "服务器错误",
            data: []
        })
    });
});

/*导出*/
module.exports = router;