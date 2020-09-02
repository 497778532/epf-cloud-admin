import Vue from "vue";
import Router from "vue-router";

import AppView from "@/components/app-view";
// 首页
import home from "@/pages/home.vue";
// 登录
import login from "@/pages/login";
import MapIndex from "@/pages/admin/home-page/MapIndex";
// 菜单管理
import menuManage from "@/pages/admin/system/menu/menuManage";
// 一张图
import onemap from "@/pages/admin/onemap/onemap";
import splitscreen from "@/pages/admin/onemap/splitscreen";
// import districtselect from '@/pages/admin/onemap/districtselect'
// 专题
import makeFlowTemplate from "@/pages/admin/onemap/topic/makeFlowTemplate";
import makeColorTemplate from "@/pages/admin/onemap/topic/makeColorTemplate";
import makeGradeTemplate from "@/pages/admin/onemap/topic/makeGradeTemplate";
import makePieTemplate from "@/pages/admin/onemap/topic/makePieTemplate";
import makeColumnarTemplate from "@/pages/admin/onemap/topic/makeColumnarTemplate";
import makeColorGradeTemplate from "@/pages/admin/onemap/topic/makeColorGradeTemplate";
import makeHotTemplate from "@/pages/admin/onemap/topic/makeHotTemplate";
import makeWaterTemplate from "@/pages/admin/onemap/topic/makeWaterTemplate";
import templateHome from "@/pages/admin/onemap/topic/templateHome";
import makeTemplate from "@/pages/admin/onemap/topic/makeTemplate";
import saveTemplate from "@/pages/admin/onemap/topic/saveTemplate";
import useTemplate from "@/pages/admin/onemap/topic/useTemplate";
import historyEdition from "@/pages/admin/resultsreview/result/historyEdition";
import resultDetail from "@/pages/admin/resultsreview/result/resultDetail";

// 成果审查
import projectadd from "@/pages/admin/resultsreview/project/projectlibrary/projectadd";
import projectedit from "@/pages/admin/resultsreview/project/projectlibrary/projectedit";
import projectcheck from "@/pages/admin/resultsreview/project/projectlibrary/projectcheck";
import historysubmission from "@/pages/admin/resultsreview/project/projectlibrary/historysubmission";
import reportupload from "@/pages/admin/resultsreview/project/projectlibrary/reportupload";
// import jindu from '@/pages/admin/resultsreview/project/projectlibrary/jindu'
import ComprehensiveDeail from "@/pages/admin/resultsreview/project/comprehensive/ComprehensiveDeail";

import centerprice from "@/pages/admin/resultsreview/project/comprehensive/centerprice";
// 编制单位
import Unitadd from "@/pages/admin/resultsreview/project/project-unit/Unitadd";
import Unitedit from "@/pages/admin/resultsreview/project/project-unit/Unitedit";
import Unitcheck from "@/pages/admin/resultsreview/project/project-unit/Unitcheck";

import editortabledetail from "@/pages/admin/resultsreview/monitoring/editortabledetail";

import exchangedetail from "@/pages/admin/resultsreview/monitoring/exchangedetail";

import percentagedetail from "@/pages/admin/resultsreview/monitoring/percentagedetail";

import columnsdetail from "@/pages/admin/resultsreview/monitoring/columnsdetail";
import qualityresult from "@/pages/admin/resultsreview/qualitytesting/qualityresult";
import qualitycatalog from "@/pages/admin/resultsreview/qualitytesting/qualitycatalog";
import assessmandetails from "@/pages/admin/monitorassess/termlyassess/assessmandetails";

import ylgmtz from "@/pages/admin/monitorassess/jcpgyj-cjfk/ylgmtz";

import pgxq from "@/pages/admin/monitorassess/jcpgyj-pgxq";
import SearchList from "@/pages/admin/home-page/SearchList";

// 预览地图服务
import mapPreviewServe from "@/pages/admin/system/mapServe/mapPreviewServe";

import xzpg from "@/pages/admin/monitorassess/termlyassess/xzpg";

// 文库管理上传
import libraryUpload from "@/pages/admin/document/libraryManage/libraryUpload";
// 文库管理新增
import articleManage from "@/pages/admin/document/libraryManage/articleManage";
// 浏览/审核文档
import documentBrowse from "@/pages/admin/document/documentBrowse/documentBrowse";
// 标签管理新增
import labelAdd from "@/pages/admin/document/labelManage/labelAdd";
// 工作文档
import workFiles from "@/pages/admin/document/workFiles/workFiles";
// 标签管理编辑
import labelEdit from "@/pages/admin/document/labelManage/labelEdit";
// 上传记录
import knowledgeConsult from "@/pages/admin/document/knowledge/knowledgeConsult";
// 审核记录
//import workFileConsult from '@/pages/admin/document/workFiles/workFileConsult'
// 我的审核的记录
//import myAuditConsult from '@/pages/admin/document/myAudit/myAuditConsult'
// 审核文档
import auditDocument from "@/pages/admin/document/myAudit/auditDocument";
// 审核记录
//import workAuditDocument from '@/pages/admin/document/workAudit/workAuditDocument'
// 工作文档标签新增
import workLabelAdd from "@/pages/admin/document/workLabelManage/workLabelAdd";
// 标签管理编辑
import workLabelEdit from "@/pages/admin/document/workLabelManage/workLabelEdit";
// 工作文档管理上传
import workDocUpload from "@/pages/admin/document/workDocMange/workDocUpload";
// 工作文档管理新增
import workDocAdd from "@/pages/admin/document/workDocMange/workDocAdd";
// 工作文档审核记录
import workAuditConsult from "@/pages/admin/document/workAudit/workAuditConsult";

import EmailDetail from "@/pages/admin/document/emailreceiving/EmailDetail";

import EmailLook from "@/pages/admin/document/emailreceiving/EmailLook";
import EmailAdd from "@/pages/admin/document/emailreceiving/EmailAdd";

//监测预警管理
import WarningMenuTable from "@/pages/admin/monitorassess/monitor-warning/WarningMenuTable";
import WarningProducts from "@/pages/admin/monitorassess/monitor-warning/WarningProducts";
import AssessReport from "@/pages/admin/monitorassess/termlyassess/AssessReport";

import HealthDetail from "@/pages/admin/health-check/health-check-admin/HealthDetail";

import HealthReport from "@/pages/admin/health-check/health-check-admin/HealthReport";
import ThreeLine from "@/pages/admin/monitorassess/three-line-control/ThreeLine";
import Control from "@/pages/admin/monitorassess/three-line-control/Control";
import DetailList from "@/pages/admin/monitorassess/three-line-control/DetailList";
import TableList from "@/pages/admin/monitorassess/three-line-control/TableList";
//监测专题--存量盘活
import StockList from "@/pages/admin/monitorassess/monitoring-project-stock/StockList";
import IconModeBase from "@/pages/admin/monitorassess/monitoring-project-stock/icon-Mode/IconModeBase";

//监测专题--约束性指标
import MonitorDetail from "@/pages/admin/monitorassess/monitoring-project-binding/MonitorDetail";
import BindingTable from "@/pages/admin/monitorassess/monitoring-project-binding/BindingTable";

//监测专题-拆旧复垦
import ReclamationTotalData from "@/pages/admin/monitorassess/monitoring-project-reclamation/ReclamationTotalData";
import ReclamationChart from "@/pages/admin/monitorassess/monitoring-project-reclamation/ReclamationChart";
import ReclamationMonitor from "@/pages/admin/monitorassess/monitoring-project-reclamation/ReclamationMonitor";

const directoryTree = name => () =>
  import("@/pages/admin/system/directoryTree/" + name);

let routesList = [];

let userType = window.location.href;

if (userType.indexOf("type=2") == -1) {
  routesList = [
    {
      path: "",
      component: AppView,
      children: [
        {
          path: "/",
          name: "home",
          component: home
        },
        {
          path: "/menuManage",
          name: "menuManage",
          component: menuManage
        },
        {
          path: "/onemap",
          name: "onemap",
          component: onemap
        },
        {
          path: "/splitscreen",
          name: "splitscreen",
          component: splitscreen
        },
        {
          path: "/templateHome",
          name: "templateHome",
          component: templateHome
        },
        {
          path: "/makeTemplate",
          name: "makeTemplate",
          component: makeTemplate
        },
        {
          path: "/makeFlowTemplate",
          name: "makeFlowTemplate",
          component: makeFlowTemplate
        },
        {
          path: "/makeColorTemplate",
          name: "makeColorTemplate",
          component: makeColorTemplate
        },
        {
          path: "/makeGradeTemplate",
          name: "makeGradeTemplate",
          component: makeGradeTemplate
        },
        {
          path: "/makePieTemplate",
          name: "makePieTemplate",
          component: makePieTemplate
        },
        {
          path: "/makeColumnarTemplate",
          name: "makeColumnarTemplate",
          component: makeColumnarTemplate
        },
        {
          path: "/makeColorGradeTemplate",
          name: "makeColorGradeTemplate",
          component: makeColorGradeTemplate
        },
        {
          path: "/makeWaterTemplate",
          name: "makeWaterTemplate",
          component: makeWaterTemplate
        },
        {
          path: "/makeHotTemplate",
          name: "makeHotTemplate",
          component: makeHotTemplate
        },
        {
          path: "/saveTemplate",
          name: "saveTemplate",
          component: saveTemplate
        },
        {
          path: "/useTemplate",
          name: "useTemplate",
          component: useTemplate
        },
        {
          path: "/useTemplate",
          name: "useTemplate",
          component: useTemplate
        },

        {
          path: "/historyEdition",
          name: "historyEdition",
          component: historyEdition
        },
        {
          path: "/resultDetail",
          name: "resultDetail",
          component: resultDetail
        },
        {
          path: "/directoryTreeAdd",
          name: "directoryTreeAdd",
          component: directoryTree("directoryTreeAdd")
        },
        {
          path: "/directoryTreeEditor",
          name: "directoryTreeEditor",
          component: directoryTree("directoryTreeEditor")
        },
        {
          path: "/mapPreviewServe",
          name: "mapPreviewServe",
          component: mapPreviewServe
        },
        {
          path: "/projectadd",
          name: "projectadd",
          component: projectadd
        },
        {
          path: "/projectedit",
          name: "projectedit",
          component: projectedit
        },

        {
          path: "/projectcheck",
          name: "projectcheck",
          component: projectcheck
        },
        {
          path: "/unitadd",
          name: "unitadd",
          component: Unitadd
        },
        {
          path: "/unitedit",
          name: "unitedit",
          component: Unitedit
        },
        {
          path: "/unitcheck",
          name: "unitcheck",
          component: Unitcheck
        },
        {
          path: "/historysubmission",
          name: "historysubmission",
          component: historysubmission
        },
        {
          path: "/reportupload",
          name: "reportupload",
          component: reportupload
        },
        // { path: '/jindu', name: 'jindu', component: jindu },

        {
          path: "/editortabledetail",
          name: "editortabledetail",
          component: editortabledetail
        },
        {
          path: "/percentagedetail",
          name: "percentagedetail",
          component: percentagedetail
        },
        {
          path: "/exchangedetail",
          name: "exchangedetail",
          component: exchangedetail
        },
        {
          path: "/columnsdetail",
          name: "columnsdetail",
          component: columnsdetail
        },
        {
          path: "/qualityresult",
          name: "qualityresult",
          component: qualityresult
        },
        {
          path: "/qualitycatalog",
          name: "qualitycatalog",
          component: qualitycatalog
        },
        {
          path: "/assessmandetails",
          name: "assessmandetails",
          component: assessmandetails
        },
        {
          path: "/jcpgyj-ylgmtz",
          name: "jcpgyj-ylgmtz",
          component: ylgmtz
        },
        {
          path: "/jcpgyj-pgxq",
          name: "jcpgyj-pgxq",
          component: pgxq
        },
        {
          path: "/xzpg",
          name: "xzpg",
          component: xzpg
        },
        {
          path: "/SearchList",
          name: "SearchList",
          component: SearchList
        },

        // 文库管理上传
        {
          path: "/libraryUpload",
          name: "libraryUpload",
          component: libraryUpload
        },
        // 文库管理新增
        {
          path: "/articleManage",
          name: "articleManage",
          component: articleManage
        },
        // 文档浏览/审核
        {
          path: "/documentBrowse",
          name: "documentBrowse",
          component: documentBrowse
        },
        // 标签管理新增
        {
          path: "/labelAdd",
          name: "labelAdd",
          component: labelAdd
        },
        // 工作文档
        {
          path: "/workFiles",
          name: "workFiles",
          component: workFiles
        },
        // 标签管理编辑
        {
          path: "/labelEdit",
          name: "labelEdit",
          component: labelEdit
        },
        // 知识文档上传记录
        {
          path: "/knowledgeConsult",
          name: "knowledgeConsult",
          component: knowledgeConsult
        },
        // 审核文档
        {
          path: "/auditDocument",
          name: "auditDocument",
          component: auditDocument
        },
        // 工作文档标签管理新增
        {
          path: "/workLabelAdd",
          name: "workLabelAdd",
          component: workLabelAdd
        },
        // 工作文档标签管理编辑
        {
          path: "/workLabelEdit",
          name: "workLabelEdit",
          component: workLabelEdit
        },
        // 工作文档管理上传
        {
          path: "/workDocUpload",
          name: "workDocUpload",
          component: workDocUpload
        },
        // 工作文档管理新增
        {
          path: "/workDocAdd",
          name: "workDocAdd",
          component: workDocAdd
        },
        //  审核记录
        {
          path: "workAuditConsult",
          name: "workAuditConsult",
          component: workAuditConsult
        },
        {
          path: "/MapIndex",
          name: "MapIndex",
          component: MapIndex
        },
        {
          path: "/WarningMenuTable",
          name: "WarningMenuTable",
          component: WarningMenuTable
        },
        {
          path: "/WarningProducts",
          name: "WarningProducts",
          component: WarningProducts
        },
        {
          path: "/StockList",
          name: "StockList",
          component: StockList
        },
        {
          path: "/IconModeBase",
          name: "IconModeBase",
          component: IconModeBase
        },
        {
          path: "/MonitorDetail",
          name: "MonitorDetail",
          component: MonitorDetail
        },
        {
          path: "/BindingTable",
          name: "BindingTable",
          component: BindingTable
        },
        {
          path: "/ReclamationTotalData",
          name: "ReclamationTotalData",
          component: ReclamationTotalData
        },
        {
          path: "/ReclamationChart",
          name: "ReclamationChart",
          component: ReclamationChart
        },
        {
          path: "/ReclamationMonitor",
          name: "ReclamationMonitor",
          component: ReclamationMonitor
        },
        {
          path: "/AssessReport",
          name: "AssessReport",
          component: AssessReport
        },

        {
          path: "/EmailDetail",
          name: "EmailDetail",
          component: EmailDetail
        },
        {
          path: "/EmailLook",
          name: "EmailLook",
          component: EmailLook
        },
        {
          path: "/ComprehensiveDeail",
          name: "ComprehensiveDeail",
          component: ComprehensiveDeail
        },
        {
          path: "/EmailAdd",
          name: "EmailAdd",
          component: EmailAdd
        },
        {
          path: "/HealthDetail",
          name: "HealthDetail",
          component: HealthDetail
        },

        {
          path: "/HealthReport",
          name: "HealthReport",
          component: HealthReport
        },
        {
          path: "/centerprice",
          name: "centerprice",
          component: centerprice
        },
        {
          path: "/ThreeLine",
          name: "ThreeLine",
          component: ThreeLine,
          redirect: "/Control",
          children: [
            {
              path: "/Control",
              component: Control
            },
            {
              path: "/DetailList",

              component: DetailList
            }
          ]
        },
        {
          path: "/TableList",
          component: TableList
        }
      ]
    },
    {
      path: `/login`,
      name: "login",
      component: login
    }
  ];
} else if (userType.indexOf("type=2") != -1) {
  routesList = [
    {
      path: "",
      component: AppView,
      children: [
        // 文库管理上传
        {
          path: "/libraryUpload",
          name: "libraryUpload",
          component: libraryUpload
        },
        // 文库管理新增
        {
          path: "/articleManage",
          name: "articleManage",
          component: articleManage
        },
        // 文档浏览/审核
        {
          path: "/documentBrowse",
          name: "documentBrowse",
          component: documentBrowse
        },
        // 标签管理新增
        {
          path: "/labelAdd",
          name: "labelAdd",
          component: labelAdd
        },
        // 工作文档
        {
          path: "/workFiles",
          name: "workFiles",
          component: workFiles
        },
        // 标签管理编辑
        {
          path: "/labelEdit",
          name: "labelEdit",
          component: labelEdit
        },
        // 知识文档上传记录
        {
          path: "/knowledgeConsult",
          name: "knowledgeConsult",
          component: knowledgeConsult
        },
        // 审核文档
        {
          path: "/auditDocument",
          name: "auditDocument",
          component: auditDocument
        },
        // 工作文档标签管理新增
        {
          path: "/workLabelAdd",
          name: "workLabelAdd",
          component: workLabelAdd
        },
        // 工作文档标签管理编辑
        {
          path: "/workLabelEdit",
          name: "workLabelEdit",
          component: workLabelEdit
        },
        // 工作文档管理上传
        {
          path: "/workDocUpload",
          name: "workDocUpload",
          component: workDocUpload
        },
        // 工作文档管理新增
        {
          path: "/workDocAdd",
          name: "workDocAdd",
          component: workDocAdd
        },
        //  审核记录
        {
          path: "workAuditConsult",
          name: "workAuditConsult",
          component: workAuditConsult
        },
        {
          path: "/EmailDetail",
          name: "EmailDetail",
          component: EmailDetail
        },
        {
          path: "/EmailLook",
          name: "EmailLook",
          component: EmailLook
        },
        {
          path: "/EmailAdd",
          name: "EmailAdd",
          component: EmailAdd
        }
      ]
    },
    {
      path: "/login?type=2",
      name: "login",
      component: login
    }
  ];
}

Vue.use(Router);
export default new Router({
  routes: routesList
});
