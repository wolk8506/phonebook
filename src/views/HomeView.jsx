import React from 'react';
import logo from '../images/contact-book.png';
import s from '../css/HomeView.module.css';

const HomeView = () => (
  <div className={s.container}>
    <h2 className={s.title}>Welcome</h2>
    <img src={logo} alt="book" width={300} />
    <h1 className={s.subTitle}>Phone book</h1>
  </div>
);

export default HomeView;
