backEnd:
筛选返回特定日期的任务
筛选返回特定时间段的任务

taskItem作为任务的通用组件

**DayCalendar**
	DayTitle：显示当前选定的日期和表单标题
		formatDate(currentDate)：格式化当前选定的日期
		showDayTitle():动态显示当前选定的日期和表单标题
	DayElementList：显示具体每日任务
		fetchTaskForDate(currentDate):从读取某天的任务（加入缓存机制，避免重复引用）
		DayElement=是否完成勾选框（勾选之后变色）+任务描述+操控菜单（debounce防抖优化）
			handelcheck(id)：任务状态变为完成
			deleteTask(id):删除任务
			editTask(id):编辑任务
			toggleMune(id):菜单展开/收起
	
**MonthCalendar**
	MonthTitle：显示周一到周日
		getDayOfWeek(currentDate):将日期按照正确的星期显示在日历上
		generateMonthDay:(currentDate)将特定范围的日期渲染到四周
	MonthGrid：整个日历大组件（以当前周为第二周，第一周为上一周，剩下两周是预警）
		MonthDay：显示每日任务缩写（以横条显示命名）
			getTaskSummary(date)：计算特定任务摘要
			showDayilySummary()：展示每天的所有人物的缩写
	
**Navigation**
	calendarType:当前日历类型
	MonthChoiceBar：月日历下面一条，选择各个时间的组件，比如study/important等子日历
		handleCalendarTypeChange():切换不同子日历
	CalenderButton：各个子日历的button/包括导入日历（课程表）、
		handelImportCalendar():导入外部日历并解析为任务
		parse(file):解析导入的文件
		
src/
├── components/     // 所有 React 组件
│   ├── App/
│   │   ├──App.jsx 顶层组件，用于加载全局结构,负责引入核心子组件
│   │   ├──App.css 全局样式，定义整个应用的基本布局和通用样式规则
│   ├── index.js React 应用的入口文件,主要职责是挂载 App 到 HTML 中的根节
│   ├──index.css 定义基础样式，如重置样式、字体、全局颜色变量等。
│   ├── Task/
│   │   ├── TaskItem.jsx
│   │   ├── TaskMenu.jsx
│   ├── Calendar/（已完成）
│   │   ├── DayCalendar.jsx 渲染每日任务列表/显示的每个任务都自带编辑按钮可以删除或者edit（...)形式
│   │   ├── MonthCalendar.jsx 渲染一个月的日历视图/每天的任务显示为摘要或缩略形式/点击时会有效果
│   │   ├── CalendarBase.jsx 作为 DayCalendar 和 MonthCalendar 的基础组件。
│   ├── pages/
│   │   ├──index.js 页面级别的组件容器
│   ├── Navigation/
│   │   ├── MonthChoiceBar.jsx 提供切换子日历（如工作、学习、重要事项等）的功能
│   │   ├── CalendarButton.jsx 负责渲染具体的日历类型按钮或导入功能
├── services/       // API 服务
│   ├── taskService.js 用于封装所有与任务相关的 API 调用逻辑。
├── hooks/ 自定义 hooks,用于提取复用的状态逻辑
├── utils/          // 通用工具函数
│   │   ├──dateUtil 处理日期相关的工具函数
│   │   ├──fileParser 解析导入的文件（如 CSV、iCalendar）
├── styles/         // 样式文件,集中管理全局和模块样式

普通函数：
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
改为箭头函数：
const Greeting = (props) => <h1>Hello, {props.name}!</h1>;





