"use client";
import React from "react";
import { connect } from "react-redux";
import CompanyDetails from "../../companyCard/CompanyDetails";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CompanyDetails />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps)(About);
