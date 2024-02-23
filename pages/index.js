import { getExerciseApi } from "@/api/exercise";
import BasicLayout from "@/layouts/BasicLayouts";
import { map, size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  Form,
  Grid,
  GridColumn,
  Image,
  Label,
  TextArea,
} from "semantic-ui-react";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [exercise, setExercise] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [imageExercise, setImageExercise] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getExerciseApi();
      if (size(response.results) > 0) {
        setExercise(response.results);
        setExerciseOptions(
          map(response.results, (obj) => {
            return {
              key: obj.id,
              value: obj.image[0].url,
              text: obj.name,
            };
          })
        );
      } else {
        setExercise([]);
        setExerciseOptions([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      <Form>
        <Grid>
          <GridColumn width={4}>
            <Label>Visualizacion</Label>
            {imageExercise && (
              <Image
                className="imageExercise"
                src={imageExercise}
                alt="Blackfitness"
              />
            )}
          </GridColumn>
          <GridColumn width={4}>
            <Form.Field>
              <Label>Lista de ejercicios</Label>
              <Dropdown
                placeholder="Selecciona el ejercicio"
                fluid
                search
                selection
                options={exerciseOptions}
                onChange={(_, data) => setImageExercise(data.value)}
              />
            </Form.Field>
          </GridColumn>
          <GridColumn width={4}>
            <Form.Field>
              <Label>Descripcion</Label>
              <TextArea />
            </Form.Field>
          </GridColumn>
        </Grid>
      </Form>
    </BasicLayout>
  );
}
