import Content from '../components/Content';
import Welcome from '../components/Welcome';
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  //connectMongoDB();
  return (
    <Content>
      <Welcome />
    </Content>
  )
}


