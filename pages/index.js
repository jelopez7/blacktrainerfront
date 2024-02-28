import { getExerciseApi } from "@/api/exercise";
import { getUsersApi } from "@/api/user";
import BasicLayout from "@/layouts/BasicLayouts";
import { map, size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/useWindowSize";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  GridColumn,
  Icon,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextArea,
} from "semantic-ui-react";
import Calendar from "react-calendar";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpXl,
} from "../utils/breakpoints";
import { getRoutines } from "@/api/routine";
import moment from "moment";
import { getTypes } from "@/api/type";
import { getGroups } from "@/api/muscle";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [exercise, setExercise] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [imageExercise, setImageExercise] = useState("");
  const [imageMuscle, setImageMuscle] = useState("");
  const [users, setUsers] = useState(null);
  const [usersOptions, setUsersOptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [routine, setRoutine] = useState([]);
  const [typesOptions, setOptionsTypes] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState([]);

  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpXl:
        return 3;
      case width > breakpointUpLg:
        return 3;
      case width > breakpointUpMd:
        return 2;
      case width > breakpointUpSm:
        return 1;
      default:
        return 2;
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getExerciseApi();
      const response2 = await getUsersApi();
      const response3 = await getTypes();
      const response4 = await getGroups();

      if (size(response.results) > 0) {
        setExercise(response.results);
        setExerciseOptions(
          map(response.results, (obj) => {
            return {
              key: obj.id,
              value: obj,
              text: obj.name,
            };
          })
        );
      } else {
        setExercise([]);
        setExerciseOptions([]);
      }
      if (size(response2.results) > 0) {
        setUsers(response2.results);
        setUsersOptions(
          map(response2.results, (obj) => {
            return {
              key: obj.id,
              value: obj.id,
              text: obj.username,
            };
          })
        );
      } else {
        setUsers([]);
        setUsersOptions([]);
      }
      if (size(response3.results) > 0) {
        setOptionsTypes(
          map(response3.results, (obj) => {
            return {
              key: obj.id,
              value: obj.id,
              text: obj.name,
            };
          })
        );
      } else {
        setOptionsTypes([]);
      }
      if (size(response4.results) > 0) {
        setGroupsOptions(
          map(response4.results, (obj) => {
            return {
              key: obj.id,
              value: obj,
              text: obj.group,
            };
          })
        );
      } else {
        setGroupsOptions([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  const handleRoutine = async (value) => {
    const response = await getRoutines(
      value,
      moment(date).format("YYYY-MM-DD")
    );
    setRoutine(response.results);
  };

  const handleMuscule = (obj) => {
    setImageMuscle(obj.image[0].url);
  };

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      <Form>
        <Form.Field>
          <label>Cliente</label>
          <Dropdown
            placeholder="Selecciona el cliente"
            fluid
            search
            selection
            options={usersOptions}
            onChange={(_, data) => handleRoutine(data.value)}
          />
        </Form.Field>
        <Grid className="contenido">
          <Grid.Row columns={getColumnsRender()}>
            <GridColumn>
              <label>
                Musculo <Icon name="universal access" />
              </label>
              <div className="card">
                <Dropdown
                  placeholder="Selecciona el ejercicio"
                  fluid
                  search
                  selection
                  options={groupsOptions}
                  onChange={(_, data) => handleMuscule(data.value)}
                />
                {imageMuscle && (
                  <Image
                    className="imageExercise"
                    src={imageMuscle}
                    alt="Blackfitness"
                  />
                )}
              </div>
            </GridColumn>
            <GridColumn>
              <label>Lista de ejercicios</label>
              <div className="card">
                <Form.Field>
                  <Dropdown
                    placeholder="Selecciona el ejercicio"
                    fluid
                    search
                    selection
                    options={exerciseOptions}
                    onChange={(_, data) =>
                      setImageExercise(data.value.image[0].url)
                    }
                  />
                  {imageExercise && (
                    <Image
                      className="imageExercise"
                      src={imageExercise}
                      alt="Blackfitness"
                    />
                  )}
                </Form.Field>
              </div>
            </GridColumn>
            <GridColumn>
              <label>Descripcion</label>
              <div className="card">
                <Form.Field className="text-area">
                  <TextArea />
                </Form.Field>
              </div>
            </GridColumn>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={getColumnsRender()}>
            <GridColumn>
              <label>
                Calendario <Icon name="calendar alternate outline" />
              </label>
              {typeof window !== "undefined" && users && (
                <div className="card">
                  <Calendar onChange={(data) => setDate(data)} value={date} />
                </div>
              )}
            </GridColumn>
            <GridColumn>
              <label>
                Rutina <Icon name="smile" />
              </label>
              <div className="card">
                <Table called selectable>
                  <TableBody>
                    {map(routine, (obj) => (
                      <TableRow>
                        <TableCell
                          onClick={() => console.log(obj.exercise.name)}
                        >
                          {obj.exercise.name}
                        </TableCell>
                        <TableCell>{obj.series}</TableCell>
                        <TableCell>{obj.reps}</TableCell>
                        <TableCell>{obj.type.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GridColumn>
            <GridColumn>
              <label>
                Configuracion <Icon name="settings" />
              </label>
              <div className="card">
                <Grid>
                  <GridColumn width={8}>
                    <Image
                      className="imageExercise"
                      src={imageExercise}
                      alt="Blackfitness"
                    />
                  </GridColumn>
                  <GridColumn width={8}>
                    <Grid>
                      <GridColumn width={8}>
                        <Input type="number" />
                        <label className="label-config">Series</label>
                      </GridColumn>
                      <GridColumn width={8}>
                        <Input type="number" />
                        <label className="label-config">Repeticiones</label>
                      </GridColumn>
                    </Grid>
                    <br />
                    <label className="label-config">Tipo</label>
                    <Dropdown
                      placeholder="Selecciona el tipo"
                      fluid
                      search
                      selection
                      options={typesOptions}
                    />
                    <br />
                    <Button inverted color="blue">
                      Guardar
                    </Button>
                  </GridColumn>
                </Grid>
              </div>
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Form>
    </BasicLayout>
  );
}
