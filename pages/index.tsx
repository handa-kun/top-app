import { useState } from 'react';
import { Button, Htag, Ptag, Rating, Tag } from './../components';


export default function Home(): JSX.Element {
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
    </>
  );
}