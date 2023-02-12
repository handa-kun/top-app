import { GetStaticProps } from 'next';
import { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { Button, Htag, Ptag, Rating, Tag } from './../components';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';


function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>Test</Htag>
      <Button appearance='primary' arrow='right'>Send</Button>
      <Button appearance='ghost' arrow='down'>Subscribe</Button>
      <Ptag size='s'>Test</Ptag>
      <Ptag>Test</Ptag>
      <Ptag size='l'>Test</Ptag>
      <Tag size='m' color='red' href='#'>Send</Tag>
      <Tag color='green' href='#'>Back</Tag>
      <Tag color='primary' href='#'>Back</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </>
  );
}

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}