var math = require('mathjs');


export default class GraphState{


  neighbors(a){
    var out = []
    for(let i = 0; i < this.numVerticies; i++){
      if (this.adjacencyMatrix.valueOf()[a][i] === 1){
        out = out.concat(i);
      }
    }
    return out;
  }

  edges(){
    var out = []
    for(let i = 0; i < this.numVerticies; i++){
      for (let j = i; j < this.numVerticies; j++){
        if (math.subset(this.adjacencyMatrix,math.index(i,j)) === 1){
          out=out.concat( [[i,j]] );
        }
      }
    }
    return out
  }

  oneQubitUnitary(matrix, a){
    var gate = (a === 0) ? matrix : [[1,0],[0,1]]

    //Prepares the tensor product of the unitary with a series of identity matricies such that (if applying to the k-th qubit of n qubits)
    //the state is prepared as I₁ ⊗ I₂ ⊗ ... ⊗ Uₖ ⊗ Iₖ₊₁ ⊗ Iₖ₊₂ ⊗ ...

    for (let i = 1; i < this.numVerticies; i++){
      if(i === a){
        gate = math.kron(gate,matrix)
      }else{
        gate = math.kron(gate,[[1,0],[0,1]])
      }
    }
    //apply gate to state
    this.state = math.multiply(gate,this.state);
  }

  cZ(a, b){
    // TODO: clean up code and add comments/equations
    //Controlled Z on qubits a and b with a as the control
    let identityMatrix = math.matrix([[1,0],[0,1]]);
    let p0 = math.matrix([[1,0],[0,0]]);
    let p1 = math.matrix([[0,0],[0,1]]);
    let pauliZ = math.matrix([[1,0],[0,-1]])

    var gateP1 = (a == 0 ? p0 : identityMatrix);
    for (let n = 1; n < this.numVerticies; n++){
      gateP1 = (a === n ? math.kron(gateP1, p0) : math.kron(gateP1,identityMatrix));
    }

    let gateP2 = (a === 0 ? p1 : identityMatrix);

    for (let n = 1; n < this.numVerticies; n++){
      if(a === n){
      gateP2 = math.kron(gateP2, p1);
      } else if(b === n) {
      gateP2 = math.kron(gateP2, pauliZ);
      } else {
      gateP2 = math.kron(gateP2, identityMatrix);
      }
    }
    let gate = math.add(gateP1,gateP2);
    this.state = math.multiply(gate, this.state);
    console.log("completed cZ on edge ("+a+","+b+")")
  }

  measureZ(a){
    /////////////////////////////////////////////////////////
    // Feed-forward stuff. Handle later
    ////////////////////////////////////////////////////////

    // // Measures the a-th qubit with respect to the Z-Axis
    // //
    // function weightedRandom(prob) {
    //   let i, sum=0, r=Math.random();
    //   for (i in prob) {
    //     sum += prob[i];
    //     if (r <= sum) return i;
    //   }
    // }
    //
    // var probabilityZero = math.complex(0,0);
    // var probabilityOne = math.complex(0,0);
    //
    // for (let i = 0; i < this.state.size()){
    //   let index = i.toString(2);
    //   if(parseInt(index[a],10) === 1 ){
    //     probabilityOne = math.add(probabilityOne,this.state.subset(math.index(i,0)));
    //   }
    //   if( parseInt(index[a],10) === 0 ){
    //     probabilityZero = math.add(probabilityZero,this.state.subset(math.index(i,0)));
    //   }
    // }
    // probabilityOne = math.multiply(probabilityOne.conjugate(),probabilityOne).re;
    // probabilityZero = math.multiply(probabilityZero.conjugate(),probabilityZero).re;
    //
    // let choice = weightedRandom({0:probabilityZero , 1:probabilityOne});
    // let aState = (choice === 1) ? math.matrix([[0],[1]]) : math.matrix([[1],[0]]);
    let adj = this.adjacencyMatrix.valueOf()
    for(let n of this.neighbors(a)){
      adj[a][n] = 0;
      adj[n][a] = 0;
    }
    this.adjacencyMatrix = math.matrix(adj)


  }

  measureY(a){
    let adj = this.adjacencyMatrix.valueOf()
    function bigE(aSet,bSet){
      let out = []
      for(let a of aSet){ for(let b of bSet){ if (a != b){ out = out.concat([[a,b]]); }}}
      return out;
    }

    for(let pair of bigE(this.neighbors(a),this.neighbors(a))){
      adj[pair[0]][pair[1]] = 0;
    }
    this.adjacencyMatrix = math.matrix(adj)

  }

  measureX(a,b0){
    function bigE(aSet,bSet){
      let out = []
      for(let a of aSet){ for(let b of bSet){ if (a != b){ out = out.concat([[a,b]]); }}}
      return out;
    }
    function isIn (set,element){
      //checks if an array (called element) is contained in an array of arrays (called set)
      for(let i of set){
        if(i.length === element.length){
          for(let j = 0; j < i.length; j++){
            if (i[j] != element[j]) break;
            if (j == i.length-1 && i[j] == element[j]) return true;
          }
        }
      }
      return false;
    }

    let delta = (arrA,arrB)  => {
                                  return arrA.filter(x => !isIn(arrB,x))
                                      .concat(arrB.filter(y  => !isIn(arrA,y)));
                                }
    function innerArrayReverser(x){
      let out = []
      for(let i=0; i<x.length; i++){
        out = out.concat([x[i]]);
        out = out.concat([[ x[i][1] , x[i][0] ]]);
      }
      return out;
    }

    //////////////////////////////
    ///End of Helper Functions///
    /////////////////////////////


    let intersectb0a = this.neighbors(a).filter(x => this.neighbors(b0).includes(x)) // intersection of the neighbors of a and b0
    let up = [...new Set([...this.neighbors(a),...this.neighbors(b0)])] //the union of neighbors of a and b0, to make the bigE calculation smoother
    let totalEdge = innerArrayReverser(this.edges()) //edges and their reverses

    var finalEdges = delta( delta( delta(totalEdge , bigE(up,up)) , bigE(intersectb0a,intersectb0a)) , bigE(this.neighbors(a),this.neighbors(a)))

    let adj = this.adjacencyMatrix.valueOf()

//if the matrix element is not in the new edges list, set it to zero, otherwise, set it to one
    for (let i=0; i<adj.length;i++){
      for(let j=0; j<=i;j++){
        if(!isIn(finalEdges,[i,j])){
          adj[i][j] = 0;
          adj[j][i] = 0;
        } else {
          adj[i][j] = 1;
          adj[j][i] = 1;
        }
      }
    }
    this.adjacencyMatrix = math.matrix(adj)

  }

  newParticle(){
    //// WARNING: THIS FUNCTION DOESNT UPDATE THE STATE VECTOR YET!!
    let adj = this.adjacencyMatrix.valueOf()
    for(let i=0; i<adj.length; i++){
      adj[i] = adj[i].concat(0);
    }
    adj = adj.concat([[0]])
    for(let i=0; i<adj.length-1; i++) adj[adj.length-1]=adj[adj.length-1].concat(0);
    this.adjacencyMatrix = math.matrix(adj)
    this.numVerticies += 1;

  }
  
  newEdge(a,b){
    let adj = this.adjacencyMatrix.valueOf()
    if(adj[a][b] === 1 || adj[b][a] === 1) console.warn('There already exists an edge there! ('+a+','+b+') is already in the list of edges');
    adj[a][b] = 1;
    adj[b][a] = 1;
    this.adjacencyMatrix = math.matrix(adj)
  }

  getAdjacencyMatrix(){
    return this.adjacencyMatrix.valueOf()
  }

  constructor(inpAdjacencyMatrix){
    //check the matrix for size & symmetry
    let size = math.matrix(inpAdjacencyMatrix).size()
    if(size[0] != size[1]){
      throw new Error("Mishapen Adjacency Matrix :: The given matrix is "+size[0]+"x"+size[1]+", but it should be square (e.g. "+size[0]+"x"+size[0]+")")
    }
    this.numVerticies = size[0];
    for(let i = 0; i < this.numVerticies; i++){
      for (let j = i; j < this.numVerticies; j++){
        if (inpAdjacencyMatrix[i][j] != inpAdjacencyMatrix[j][i]){
          throw new Error("Non-symmetric Adjacency Matrix :: The given value at "+i+","+j+" should be equal to the value at "+j+","+i);
        }
      }
    }

    //apply constants
    this.adjacencyMatrix = math.matrix(inpAdjacencyMatrix);
    const singlestate = math.matrix([[1/math.sqrt(2)],[1/math.sqrt(2)]]);

    //construct blank graph
    this.state = singlestate;
    for (let n = 0; n < this.numVerticies-1; n++){
      this.state = math.kron(this.state,singlestate)
    }

    for(let edge of this.edges()){
      console.log("performing cZ on ("+edge[0]+","+edge[1]+")")
      this.cZ(edge[0], edge[1]);
    }
    console.log(":: Blank Graph Construction Complete ::");console.log()
  }

  getState(indexFormat='bin'){
    var out = ''
    for(let i = 0; i < math.pow(2,this.numVerticies); i++){
      if (indexFormat == 'bin'){
        var index = i.toString(2).padStart(this.numVerticies,'0');
      }else{
        var index = i
      }
      out = out.concat('|'+index+'>\t' + this.state.subset(math.index(i,0))+'\n')
    }
    return out
  }


}
