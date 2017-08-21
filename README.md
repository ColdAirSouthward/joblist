## 视觉需求
  √示例图中的网页，是没有任何 CSS 的，请尽自己所能，补充样式，完善设计。


## 交互需求
 √团队条目有『折叠』和『展开』两种状态，折叠状态下，团队中的职位条目都会被隐藏。
 
 √职位条目可以被『选中』和『取消选中』。
 
 √团队条目可以被『选中』和『取消选中』。当团队条目中有任何职位条目被『选中』时，团队条目自己也会被『选中』。当团队条目被『取消选中』时，它的所有职位条目也都需要被『取消选中』。
 
 √团队条目中的『招聘数量』（示例图中方括号中的数字），等于团队中所有被『选中』的职位条目的招聘数量（示例图中方括号中的数字）的总和。
 
 √可以添加新的团队。添加新团队时，需要输入新团队的名称（不能跟已有团队重复）。
 
 √可以在任何团队里添加新的职位。添加新职位时，需要输入新职位的名称（不能跟所有已有职位重复）和招聘数量。
 
 √任何已存在的团队，都可以修改名称。
 
 √任何已存在的职位，都可以修改名称和招聘数量。
 
 √『总数』等于所有选中的职位的招聘数量之和。
 
 
## 数据需求
 √ 从以下 API 加载团队和职位的数据，应用在初始状态时，显示的内容应该跟 API 中的数据完全一致。 
 
API: https://s.flipchina.cn/api/exercise/job-list.json
 
 √点击『保存』按钮，要把所有应用状态（比如原有条目和新添加的条目、修改过的条目信息、条目的选中状态、团队条目的折叠状态、……）都做离线的持久化存储（使用 HTML5 API），重新加载（刷新）网页之后，所有应用状态都要能自动恢复，跟刷新前保持一致。
 
 √点击『重置』按钮，要把所有应用状态恢复为初始状态（跟 API 中的数据一致，无选中和折叠状态）
