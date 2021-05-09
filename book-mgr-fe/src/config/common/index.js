import { reactive } from 'vue';
import DASHBOARD from './Pages/Dashboard';
import CLASSIFY from './Pages/Classify';
import TOPIC_MGR from './Pages/TopicMgr';

export default reactive({
  SITE_NAME: '病人信息管理系统',

  KEYWORD: '病人',

  PAGE_META: {
    DASHBOARD,
    CLASSIFY,
    TOPIC_MGR,
  },
});
