const fadeSpeed = 1; // Speed for nodes to fade, change to 0 to disable the fading animation
const speed = 500; // Speed for the traverse animation
let cells = [];
let Graph = [
  [0,1,1,1,0],
  [0,1,0,1,0],
  [1,1,1,1,1],
  [0,1,0,1,0],
  [0,1,0,1,0],
]
let val=255, ms = 0,i=0; // val is the colour when bfs/dfs searched the node
const rows = Graph.length;
const columns = (Graph[0].length*2)+1;

// G: Graph, mode: bfs/dfs, start: start point to launch search
function graphsearch(G,mode, start) {
  ds = [[start[0],start[1]]]
  values = []
  marked = {}
  while (ds.length > 0){
      if(mode=='dfs'){
        v = ds.pop()
      }else if(mode=='bfs'){
        v = ds.shift()
      }
      if (!(v in marked)){
          // console.log(v)
          marked[v]= true
          coords = [[v[0]+1,v[1]],[v[0],v[1]+1],[v[0]-1,v[1]],[v[0],v[1]-1]]
          for (let i of coords) {
              if ((i[0] < 0 || i[0]>G.length-1) || (i[1]<0 || i[1]>G[0].length-1)){
                  // pass
              }else{
                  if (G[i[0]][i[1]] == G[v[0]][v[1]]){
                      if (!(i in marked)){
                          ds.push(i)
                      }
                  }
              }
          }
          G[v[0]][v[1]] = val;
          values.push([v[0],v[1]])
      }
  }
  return values
}

let dfs_values = graphsearch(Graph,'dfs', [4,1])
let bfs_values = graphsearch(Graph,'bfs',[4,1])

function setup() {
  createCanvas(400, 200);

  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < columns; c++) {
      cells[r][c] = 0
    }
  }
  
}

function draw() {
  if (i < dfs_values.length){
    if((millis()-ms) > speed){
      cells[dfs_values[i][0]][dfs_values[i][1]] = 255;
      cells[bfs_values[i][0]][bfs_values[i][1]+Graph[0].length+1] = 255;
      i+=1
      ms = millis()
    }
  }
  const cellWidth = width / columns;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      cells[r][c] -= fadeSpeed;
      cells[r][c] = constrain(cells[r][c], 0, 255);

      const y = height * (r / rows);
      const x = width * (c / columns);

      fill(cells[r][c], 0, 128);
      rect(x, y, cellWidth, height);
    }
  }
  
}
