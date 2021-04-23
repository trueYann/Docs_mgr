<template>
  <div>
    <a-modal
      :title="`添加${$$.KEYWORD}`"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }">
        <a-form-item :label="`${$$.KEYWORD}名`">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="页码">
          <a-input-number v-model:value="addForm.price" :min="0" :max="99999999999" />
        </a-form-item>
        <!-- <a-form-item label="保质期">
          <a-input v-model:value="addForm.expirationDate" />
        </a-form-item> -->
        <a-form-item label="归档日期">
          <a-date-picker v-model:value="addForm.producedDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-select
            v-model:value="addForm.classify"
            style="width: 120px"
          >
            <a-select-option
              v-for="item in store.goodClassify"
              :key="item._id"
              :value="item._id"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
