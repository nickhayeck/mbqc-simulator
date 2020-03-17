# Measurement-Based Quantum Computing Simulator

[![Build Status](https://travis-ci.com/nickhayeck/mbqc-simulator.svg)](https://travis-ci.com/nickhayeck/mbqc-simulator)
![GitHub package.json version](https://img.shields.io/github/package-json/v/nickhayeck/mbqc-simulator)
![GitHub](https://img.shields.io/github/license/nickhayeck/mbqc-simulator)
![GitHub repo size](https://img.shields.io/github/repo-size/nickhayeck/mbqc-simulator)

Welcome to the first-ever simulator of a measurement-based quantum computer (sometimes also called a "cluster state computer" or a "one-way quantum computer"). This project owes its design and genius to [Olivier Pfister](https://sites.google.com/view/qfqi/home), professor of physics at the University of Virginia.

This is a simulator of the quantum computing paradigm first shown to be of use by Robert Raußendorf in his dissertation (which can be found [here](https://edoc.ub.uni-muenchen.de/1367/1/Raussendorf_Robert.pdf)). For a more gentle introduction to the topic, I would suggest [this paper](https://arxiv.org/abs/quant-ph/0504097) by Michael A. Nielsen or [this paper](https://arxiv.org/abs/quant-ph/0307130) by M. Hein, J. Eisert, & H.J. Briegel.


### Usage
To use make use of the tool, visit [this project's GitHub Pages](https://nickhayeck.github.io/mbqc-simulator/). A usage guide will be added to that page in short order, and it will be included here too, upon completion.


### Dependencies

MBQC-Simulator uses a number of open source projects to function. The creators of these libraries have my thanks:

* [React] - Web app development framework by Facebook
* [Create React App] - a bootstrapping library for React
* [node.js] - server
* [Framer Motion] - React library to power production-ready animations.
* [MathJS] - math library used in [backend.js](https://github.com/nickhayeck/mbqc-simulator/blob/master/src/backend.js)

### Future Additions
The simulator currently does not calculate the actual quantum state of the graph. This will be implemented in `v2.0.0`. As of now, the simulator currently only computes the edge transformations. The addition of state calculation will allow for more complex algorithms to be implemented on the simulator.

   [Create React App]:<https://github.com/facebook/create-react-app>
   [Framer Motion]: <https://www.framer.com/motion/>
   [git-repo-url]: <https://github.com/nickhayeck/mbqc-simulator.git>
   [node.js]: <http://nodejs.org>
   [React]: <https://reactjs.org/>
   [MathJS]: <https://mathjs.org/>
 
