import React from 'react';
import './App.css';
import { motion } from "framer-motion";
import GraphState from './backend.js';


class Button extends React.Component{
  render(){
    return (<td id={this.props.isSelected ? 'selectedTool':'unselectedTool'} className='toolbarCell' onClick = {(e) => {this.props.handleClick(e)}}>
            <img src={process.env.PUBLIC_URL+'/icons/icons_'.concat(this.props.id,'.png')} id={this.props.id} alt='' className='buttonImage'/>
            </td>
           );
  }
}


class FloatingToolBar extends React.Component{
  render(){


    let currentTool = this.props.selectedTool;
    let clickHandler = this.props.clickHandler;

    return (   <div className='toolbar'>
                <table className="toolbarTable">
                <tbody>
                  <tr>
                    <Button id='settings' handleClick={this.clickHandler}/>
                    <td colSpan='6'> <p className='titleText'> Cluster State Simulator </p> </td>
                  </tr>
                  <tr>

                    <Button id='newParticle' isSelected= {currentTool == 'newParticle'} handleClick={clickHandler}/>

                    <Button id='newEdge' isSelected= {currentTool == 'newEdge'} handleClick={clickHandler}/>

                    <Button id='moveParticles' isSelected= {currentTool == 'moveParticles'} handleClick={clickHandler}/>

                    <Button id='unitary' isSelected= {currentTool == 'unitary'} handleClick={clickHandler}/>

                    <Button id='mx' isSelected= {currentTool == 'mx'} handleClick={clickHandler}/>

                    <Button id='my' isSelected= {currentTool == 'my'} handleClick={clickHandler}/>

                    <Button id='mz' isSelected= {currentTool == 'mz'} handleClick={clickHandler}/>

                  </tr>
                </tbody>
                </table>
              </div>


  );
  }
}


class Particle extends React.Component{
  constructor(props){
    //Upon mounting into the DOM (always done at (0,0) position before being animated to 'initialX' and 'initialY'),
    //create a position vector (stored in the ParticleCanvas)
    super(props);
    let info = this.props.info
    info.onUpdate({x:0 , y:0},info.number)

  }

  render(){
    const particleStyle = {
      backgroundColor: 'blue',
      borderRadius: '50%',
      width: "10vh",
      height: "10vh",
      position: 'fixed',
      top: '0vh',
      left: '0vw',
      border: '1vh solid #000',
      zIndex: '10000'
      };
    const textStyle = {
      textAlign: 'center',
      verticalAlign:'middle',
      lineHeight:'50%',
      color:'white',
      fontSize:'4vh',
      pointerEvents:'none'
    }
    let info = this.props.info

    return (<motion.div onUpdate = {(latest,id)=>info.onUpdate(latest,info.number)}
                        animate = {{x: info.initialX, y: info.initialY}}
                        style={particleStyle}
                        drag={info.draggable}
                        dragConstraints={info.particleBox}
                        onClick = {(event,id)=>this.props.clickHandler(event,info.number)}>

              <p id = 'particleText' style = {textStyle}>{info.number}</p>

            </motion.div>
          );
  }
}



class Edge extends React.Component{
  render(){
    //make the code less messy
    let v1 = this.props.firstVertex;
    let v2 = this.props.secondVertex;
    let coordMod = window.innerHeight*.06;

    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    return <line x1={v1.x + coordMod}
                 y1={v1.y + coordMod}
                 x2={v2.x + coordMod}
                 y2={v2.y + coordMod} />;

  }
}


class ParticleCanvas extends React.Component{
  constructor(props){
    super(props);
    let g = new GraphState(this.props.adjacencyMatrix)
    this.state = {
      positionTable : {},
      graph : g,
      edges : g.edges(),
      mxhelper: [undefined, false],
      edgehelper: [undefined,false],
      extraParticles:[]
    };
    this.particleClickHandler = this.particleClickHandler.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.newParticleCreator = this.newParticleCreator.bind(this)
  }

  onUpdate(latest,id){
    //console.time('updating table '+id)
    //(1) Make a copy of the positioning table, so that we can make edits and then replace the old table in the state
    let copyTable = this.state.positionTable;
    //(2) Slap in the new data, first making sure that there is new data to add
    let xVal = (typeof latest.x  !== 'undefined') ? latest.x : copyTable[id]['x'];
    let yVal = (typeof latest.y  !== 'undefined') ? latest.y : copyTable[id]['y'];
    copyTable[id] = {x:xVal,y:yVal};
    //(3) Replace the old table in the state
    this.setState({positionTable : copyTable})

    //console.timeEnd('updating table '+id)
  }

  particleClickHandler(event,id){

    //prevent special neighbor particle selection after tool switching
    if(this.props.selectedTool !== 'mx'){
      this.setState({mxhelper:[undefined, false]})
    }
    //prevent edge creation on second particle selection after tool switching
    if(this.props.selectedTool !== 'newEdge'){
      this.setState({edgehelper:[undefined, false]})
    }

    //Z-axis measurement
    if (this.props.selectedTool === 'mz'){
      console.log('measurement in z direction initiated by click on particle #'+id);
      let g = this.state.graph;
      g.measureZ(id);
      this.setState({graph:g, edges:g.edges()});
    }

    //Y-axis measurement
    if (this.props.selectedTool === 'my'){
      console.log('measurement in y direction initiated by click on particle #'+id);
      let g = this.state.graph;
      g.measureY(id);
      this.setState({graph:g, edges:g.edges()});
    }

    //X-axis measurement
    if (this.props.selectedTool === 'mx' && !this.state.mxhelper[1]){
      console.log('measurement in x direction initiated by click on particle #'+id+" measurement will begin once a second particle is selected");
      this.setState({mxhelper:[id,true]});
    }
    else if (this.props.selectedTool === 'mx' && this.state.mxhelper[1]){
      console.log('measurement in x direction initiated with special neighbor #'+id);
      let g = this.state.graph;
      g.measureX(id,this.state.mxhelper[0]);
      this.setState({graph:g, edges:g.edges()});
      this.setState({mxhelper:[undefined,false]});
    }

    //Edge Creation
    if (this.props.selectedTool === 'newEdge' && !this.state.edgehelper[1]){
      console.log('edge creation initiated by click on particle #'+id+" creation will begin once a second particle is selected");
      this.setState({edgehelper:[id,true]});
    }
    else if (this.props.selectedTool === 'newEdge' && this.state.edgehelper[1]){
      console.log('edge creation initiated with new neighbor #'+id);
      let g = this.state.graph;
      g.newEdge(this.state.edgehelper[0],id);
      this.setState({graph:g, edges:g.edges()});
      this.setState({edgehelper:[undefined,false]});
    }
  }

  newParticleCreator(event){

    if(this.props.selectedTool === 'newParticle'){
      let g = this.state.graph;
      g.newParticle();

      let particleInfo = {
        number : g.getAdjacencyMatrix().length,
        initialX : "calc("+ event.clientX + "px - 6vh)",
        initialY : "calc("+ event.clientY + "px - 6vh)",
        particleBox : this.props.container,
        draggable : this.props.canDrag,
        onUpdate : this.onUpdate
      };
      let theNewParticle = <Particle info = {particleInfo} key = {particleInfo.number.toString()} clickHandler = {this.particleClickHandler}/>;

      this.setState({extraParticles:this.state.extraParticles.concat(theNewParticle)})
      this.setState({graph:g, edges:g.edges()});
    }
  }

  render(){

    //console.time('Render Loop Completed')
    let particlesToRender = [];
    let edgesToRender = [];
    let max = this.state.graph.getAdjacencyMatrix().length

    for (let i = 0; i < max; i++){
      let column = i*150+300;
      let row = Math.floor(i/5)*150 + 300;
      let particleInfo = {
        number : i,
        initialX : column,
        initialY : row+Math.cos(2*i/Math.PI)*150,
        particleBox : this.props.container,
        draggable : this.props.canDrag,
        onUpdate : this.onUpdate
      };
      particlesToRender.push(<Particle info = {particleInfo} key = {particleInfo.number.toString()} clickHandler = {this.particleClickHandler}/>);
    }
    for(let node of this.state.edges){
      //console.log((this.state.positionTable[node[0]] !== undefined) ? this.state.positionTable[node[0]].x : "aaabbbccc")
      let table = this.state.positionTable;
      if (typeof table !== 'undefined' && typeof table[node[0]] !== 'undefined' && typeof table[node[1]] !== 'undefined'){
        edgesToRender.push(<Edge firstVertex = {table[node[0]]} secondVertex = {table[node[1]]} key = {'edge ('+node[0]+','+node[1]+')'}/>)
      }
    }

    //console.timeEnd("Render Loop Completed")
    return(
      <div className="particlecanvas" onClick={this.newParticleCreator}>

        {particlesToRender}
        <svg>
          {edgesToRender}
        </svg>
      </div>
    );

  }
}







///////////////////////////////////////////////
////    Begin the basic  app rendering     ////
//////////////////////////////////////////////







class Page extends React.Component{
  constructor(props){
    super(props);
    this.page = React.createRef();
    this.state = {selectedTool    : 'newParticle',
                  adjacencyMatrix : [[0,1,0,0,1],
                                     [1,0,1,0,0],
                                     [0,1,0,1,0],
                                     [0,0,1,0,1],
                                     [1,0,0,1,0]]}
    this.toolbarClickHandler = this.toolbarClickHandler.bind(this);
  }

  toolbarClickHandler(event){
    this.setState({selectedTool : event.target.getAttribute("id")}, () => console.log("tool switched to: "+this.state.selectedTool));
  }

  render(){

    return (
      <div id = "page" ref = {this.page}>
        <FloatingToolBar container = {this.page}
                         selectedTool = {this.state.selectedTool}
                         clickHandler = {this.toolbarClickHandler}/>


        <ParticleCanvas container = {this.page}
                        selectedTool = {this.state.selectedTool}
                        canDrag = {this.state.selectedTool == 'moveParticles'}
                        adjacencyMatrix = {this.state.adjacencyMatrix}/>
      </div>
    );
  }
}


function App() {
  return (
    <Page/>
  );
}

export default App;
