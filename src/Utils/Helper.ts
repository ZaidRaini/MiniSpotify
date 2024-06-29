export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };


export const timer = (time?:number) => {
  if(time){

    let min = '0' + Math.floor(time/60);
    let sec = Math.floor(time % 60);
    if(sec < 10){return `${min}:0${sec}`;}
    return `${min}:${sec}`
  }
  return '00:00';
}