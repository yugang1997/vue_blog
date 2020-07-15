const express = require("express");
const linksDB = require("../../db/links");

const router = express.Router();
/*��ѯ�ռ�*/
router.get('/',(req,res)=>{
  linksDB.find({},{},{sort:{date:-1}})
    .then(data=>{
      res.send({
        code: 0,
        msg: "��ѯ�ɹ�",
        data
      })
    })
    .catch(()=>{
      res.send({
        code: 0,
        msg: "����������",
        data: []
      })
    });
});

module.exports = router;