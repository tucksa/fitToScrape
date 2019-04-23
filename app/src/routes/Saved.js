import React, { Fragment } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron.js';
import Savedarticles from '../components/Saved/savedArticles';

const savedRoute = () => {
    return (
      <Fragment>
            <Jumbotron/>
            <Savedarticles/>
      </Fragment>
    )
}

  export default savedRoute