import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Home from './home';
import HouseholdIndex from './household/householdIndex.js';

const ContentTitle = () => (
  <section className="content-header">
    <h1>
      Header
    </h1>
  </section>
);

export default class Dashboard extends React.Component {
  // TODO: Return AdminLTE base template and register sub-routes here
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <ContentTitle />
          <section className="content">
            <Route exact path="/dashboard" component={Home} />
            {/* TODO: Finish routes */}
            <Route exact path="/dashboard/household" component={HouseholdIndex} />
            {/* <Route exact path="/dashboard/household/create" component={Home} /> */}
            {/* <Route exact path="/dashboard/household/edit/:id" component={Home} /> */}
          </section>
        </div>
      </div>
    );
  }
}
