import Container from '../pages/tableSystem'
import exportExcel from '../components/export-excel'
import addInfo from '../components/addInfo'
import history from '../components/history'
import index from '../components/index'



const routes = [
{
  path: '/',
  redirect: '/index',
  name: 'Container',
  component: Container,
  meta:{
    requireLogin:true,
    title:'产品服务中台表单工具'
  },
  children: [
    {path: 'index', name: '首页', component: index, meta:{
      title:'产品服务中台表单工具',
    }, },
    {path: 'addInfo', name: '添加', component: addInfo, meta:{
      title:'产品服务中台表单工具',
    }, },
    {path: 'exportExcel', name: '待处理', component: exportExcel, meta:{
      title:'产品服务中台表单工具'
    }, },   
    {path: 'history', name: '历史', component: history, meta:{
      title:'产品服务中台表单工具',
    }, },
  ]
}]
;

export default routes;
