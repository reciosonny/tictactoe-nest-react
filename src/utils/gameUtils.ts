


export const checkWinner = (arr: any[], selected: string) => {



  const winningCombi1 = [0,1,2].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  const winningCombi2 = [3,4,5].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  const winningCombi3 = [6,7,8].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  
  const winningCombi4 = [0,3,6].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  const winningCombi5 = [1,4,7].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  const winningCombi6 = [2,5,8].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);

  const winningCombi7 = [0,4,8].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);
  const winningCombi8 = [2,4,6].reduce((init, curr) => {
    return arr[curr] === selected && init;
  }, true);


  return winningCombi1 || winningCombi2 || winningCombi3 || winningCombi4 || winningCombi5 || winningCombi6 || winningCombi7 || winningCombi8;
}