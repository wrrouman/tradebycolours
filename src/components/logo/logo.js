import { stockLogo } from "../api/api";

const displayLogo = () => {
    const [logo, setlogo] = useState();
  
    useEffect(() => {
      stockLogo()
        .then((res) => {
          console.log(res.data);
  
          // setlogo(res.data);
        })
        .catch((error) => console.log(error));
    }, []);

  return (
    <>
      <div></div>
    </>
  );
};
