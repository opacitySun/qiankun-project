import React from 'react';
import Header from '@src/components/Header';

interface IProps {
  name: string;
  age: number;
}

function Index(props: IProps) {
  const { name, age } = props;
  return (
    <div className='app'>
      <Header />
      <span>{`Hello! I'm ${name}, ${age} yearssss old.`}</span>
    </div>
  );
}

export default Index;