const db = require('quick.db')

async function staffis(id) {
  const staffs = await stafflist()
  if(staffs.indexOf(id) >= 0) return true
  else return false
}

async function stafflist() {
  let staffArray = await db.fetch('staff')
  staffArray = JSON.parse(staffArray)
  if (!staffArray) return []
  return staffArray
}

async function staffadd(id) {
  let list = await stafflist()
  list.push(id)
  db.set('staff', JSON.stringify(list))
  return list
}

module.exports = {
  staff: staffis,
  staffList: stafflist,
  staffAdd: staffadd
}