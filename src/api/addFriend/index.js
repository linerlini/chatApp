import request from 'assets/js/network';

async function searchUserInfo(query) {
  try {
    const result = await request({
      url: '/friendship/search',
      params: {
        account: query,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function applyAddFriend({
  account,
  addAccount,
  name,
  addName,
  group,
  groupname,
  signature,
  friendSignature,
}) {
  let result = false;
  try {
    result = await request({
      url: '/friendship/apply',
      method: 'post',
      data: {
        account,
        addAccount,
        name,
        addName,
        group,
        groupname,
        signature,
        friendSignature,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return result;
}

async function handleFriend({
  account,
  addAccount,
  type,
  options,
}) {
  let flag = true;
  try {
    await request({
      url: '/friendship/handle',
      method: 'post',
      data: {
        account,
        addAccount,
        type,
        options,
      },
    });
  } catch {
    flag = false;
  }
  return flag;
}

export {
  searchUserInfo,
  applyAddFriend,
  handleFriend,
};
