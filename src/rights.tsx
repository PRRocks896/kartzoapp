export default function checkRights(module_name: any, type: any) {
  let user_right = JSON.parse(type);
  // let user_right = JSON.parse(Auth.getRight());
  // console.log("user_right",user_right)
  if (user_right && user_right.length) {
    if (module_name && type) {
      var flag = 0;
      let ind = user_right.findIndex((x: any) => x.name === module_name);
      if (ind > -1) {
        // console.log("type",type)
        // console.log("module_name",module_name)
        if (type === "view" && user_right[ind].view === 1) {
          flag = 1;
        }
        if (type === "add" && user_right[ind].add === 1) {
          flag = 1;
        }
        if (type === "edit" && user_right[ind].edit === 1) {
          flag = 1;
        }
        if (type === "delete" && user_right[ind].delete === 1) {
          flag = 1;
        }
        if (type === "detail" && user_right[ind].detail === 1) {
          flag = 1;
        }
      }
      return flag === 1 ? true : false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
