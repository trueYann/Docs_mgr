const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');
const _ = require('../../config/common');

const GoodSchema = new mongoose.Schema({
  // // 文档名
  // name: String,
  // // 页码
  // price: Number,
  // // 作者
  // author: String,
  // // 归档日期
  // publishDate: String,
  // // 分类
  // classify: String,
  // // 库存
  // count: Number,
  ..._.SCHEMA.TOPIC_MGR,

  meta: getMeta(),
});

GoodSchema.pre('save', preSave);

mongoose.model('Good', GoodSchema);
