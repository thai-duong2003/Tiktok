export function CheckVideoLiked(listLikeduser, idvideo) {
  let check_liked;
  if (listLikeduser) {
    const check = listLikeduser.find(function (item) {
      if (item.video_id) {
        return item.video_id === idvideo;
      }
    });
    if (check) {
      check_liked = true;
    } else {
      check_liked = false;
    }
  }
  return check_liked;
}
