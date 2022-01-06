import React from 'react';
import { Layout } from '../../components/Layout';

const AboutPageComponent = () => (
  <Layout>
    <h2 className="typography-size-2">About</h2>
    <p>
      Shooting Ranges application has been created by Bedřich Schindler as a term project for subject Internet
      Application Development at the Faculty of Electrical Engineering at the Czech Technical University in Prague.
    </p>
    <p>
      Application aims at enthusiastic shooters and serves as the public database of shooting ranges. Anybody can
      create, edit or delete a shooting range from the database. Shooting ranges are presented at two pages.
      Main page displays shooting ranges as markers on the map while the detail can be opened by clicking on the marker
      and the other page shows shooting ranges in the table which allows users to manage them.
    </p>
    <p>
      This application uses its on API that serves as the storage of the data and then two publicly available APIs.
      OpenStreet Maps API is used in add/edit modal to guess coordinates based on entered Street and City.
      Foursquare API is used in add/edit modal to find Foursquare place based on entered Name and City, so that
      information like address, coordinates, phone, web can be automatically filled from Foursqure Place, and if user
      connects Foursquare place with the shooting range, tips and photos are then retrieved from Foursquare after
      the user opens Shooting Range detail.
    </p>
  </Layout>
);

export default AboutPageComponent;
