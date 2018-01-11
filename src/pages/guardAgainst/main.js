import AllStatus from './all-status'
import TodoStatus from './todo'
import DoingStatus from './doing'
import IssueStatus from './issue'
import AddNewModel from './addNew'
export default {
  data () {
    return {
      activeTab: 'allStatus',
      currModelTitle: "新增任务",
      showModel: true
    }
  },
  components: {
    AllStatus,
    TodoStatus,
    DoingStatus,
    IssueStatus,
    AddNewModel
  }
}