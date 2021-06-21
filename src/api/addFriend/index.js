import request from 'assets/js/network';
import refreshJWT from 'assets/js/network/refreshJWT';

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
    if (err.message === 'refresh JWT') {
      await refreshJWT();
      return searchUserInfo(query);
    }
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
    if (err.message === 'refresh JWT') {
      await refreshJWT();
      return applyAddFriend({
        account,
        addAccount,
        name,
        addName,
        group,
        groupname,
        signature,
        friendSignature,
      });
    }
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
  } catch (err) {
    if (err.message === 'refresh JWT') {
      await refreshJWT();
      return handleFriend({
        account,
        addAccount,
        type,
        options,
      });
    }
    flag = false;
  }
  return flag;
}

export {
  searchUserInfo,
  applyAddFriend,
  handleFriend,
};
