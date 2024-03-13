import { getExerciseApi } from "@/api/exercise";
import { getUsersApi } from "@/api/user";
import BasicLayout from "@/layouts/BasicLayouts";
import { filter, isEmpty, map, size } from "lodash";
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
  Loader,
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
import { getRoutines, setRoutineApi } from "@/api/routine";
import moment from "moment";
import { getTypes } from "@/api/type";
import { getGroups } from "@/api/muscle";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const [exercise, setExercise] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [imageExercise, setImageExercise] = useState("");
  const [imageMuscle, setImageMuscle] = useState("");
  const [routineSelect, setroutineSelect] = useState({
    image: "",
    type: "",
    reps: "",
    series: "",
  });
  const [users, setUsers] = useState(null);
  const [usersOptions, setUsersOptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [routine, setRoutine] = useState([]);
  const [routineDate, setRoutineDate] = useState([]);
  const [typesOptions, setOptionsTypes] = useState([]);
  const [groupsOptions, setGroupsOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!user && typeof window !== "undefined") {
      router.push("/auth"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  useEffect(() => {
    if (user && typeof window !== "undefined") {
      (async () => {
        const response = await getExerciseApi();
        const response2 = await getUsersApi();
        const response3 = await getTypes();
        const response4 = await getGroups();

        if (size(response.data) > 0) {
          setExercise(response.data);
        } else {
          setExercise([]);
        }
        if (size(response2.results)) {
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
    }
  }, []);

  const handleUSer = async (value) => {
    formik.setFieldValue("user", value);
    const response = await getRoutines(value);
    setRoutine(response.results);
    setRoutineDate(
      filter(response.results, (obj) => {
        return obj.date == moment(date).format("YYYY-MM-DD");
      })
    );
  };

  const handleExercise = async (value) => {
    setImageExercise(value.attributes.image.data[0].attributes.url);
    formik.setFieldValue("exercise", value.id);
  };

  const handleMuscule = (obj) => {
    setImageMuscle(obj.image[0].url);

    setImageExercise("");
    setExerciseOptions(
      map(
        filter(exercise, (obje) => {
          return obje.attributes.group.data.id == obj.id;
        }),
        (objee) => {
          return {
            key: objee.id,
            value: objee,
            text: objee.attributes.name,
          };
        }
      )
    );
  };

  const handleDate = (value) => {
    formik.setFieldValue("date", moment(value).format("YYYY-MM-DD"));
    setDate(value);
    setRoutineDate(
      filter(routine, (obj) => {
        return obj.date == moment(value).format("YYYY-MM-DD");
      })
    );
  };

  const handleRoutine = (value) => {
    setroutineSelect({
      image: value.exercise.image[0].url,
      reps: value.reps,
      series: value.series,
      type: value.type.name,
      description: value.description,
    });
  };

  const formik = useFormik({
    initialValues: initialValues(date),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setIsLoading(true);
      await setRoutineApi(formData);
      setIsLoading(false);
      handleUSer(formik.values.user);
    },
  });

  if (
    size(groupsOptions) == 0 ||
    size(usersOptions) == 0 ||
    size(typesOptions) == 0
  ) {
    return <Loader active>Cargando</Loader>;
  }

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Cliente</label>
          <Dropdown
            placeholder="Selecciona el cliente"
            fluid
            search
            selection
            options={usersOptions}
            value={formik.values.user}
            error={formik.errors.user}
            onChange={(_, data) => handleUSer(data.value)}
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
                  placeholder="Selecciona el musculo"
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
                    value={formik.values.exercise}
                    error={formik.errors.exercise}
                    onChange={(_, data) => handleExercise(data.value)}
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
                <Grid>
                  <GridColumn width={8}>
                    <Form.Field className="text-area">
                      <TextArea
                        name="description"
                        onChange={formik.handleChange}
                        className={formik.errors.description && "error"}
                      />
                      <label className="label-config">Detalle</label>
                    </Form.Field>
                  </GridColumn>
                  <GridColumn width={8}>
                    <Grid>
                      <GridColumn width={8}>
                        <Form.Field>
                          <Input
                            type="number"
                            name="series"
                            onChange={formik.handleChange}
                            error={formik.errors.series}
                          />
                        </Form.Field>
                        <label className="label-config">Series</label>
                      </GridColumn>
                      <GridColumn width={8}>
                        <Input
                          type="number"
                          name="reps"
                          onChange={formik.handleChange}
                          error={formik.errors.reps}
                        />
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
                      value={formik.values.type}
                      error={formik.errors.type}
                      onChange={(_, data) =>
                        formik.setFieldValue("type", data.value)
                      }
                    />
                    <br />
                    <Button
                      type="submit"
                      loading={isLoading}
                      inverted
                      color="green"
                    >
                      Guardar
                    </Button>
                  </GridColumn>
                </Grid>
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
                  <Calendar
                    onChange={(data) => handleDate(data)}
                    value={date}
                  />
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
                    {map(routineDate, (obj) => (
                      <TableRow>
                        <TableCell onClick={() => handleRoutine(obj)}>
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
                      src={routineSelect.image}
                      alt="Blackfitness"
                    />
                  </GridColumn>
                  <GridColumn width={8}>
                    <Grid>
                      <GridColumn width={8}>
                        <Form.Field>
                          <label className="label-config">Series</label>
                          <Input
                            disabled
                            type="text"
                            value={routineSelect.series}
                          />
                        </Form.Field>
                      </GridColumn>
                      <GridColumn width={8}>
                        <Form.Field>
                          <label className="label-config">Repeticiones</label>
                          <Input
                            disabled
                            type="text"
                            value={routineSelect.reps}
                          />
                        </Form.Field>
                      </GridColumn>
                    </Grid>
                    <Form.Field>
                      <label className="label-config">Tipo</label>
                      <Input disabled type="text" value={routineSelect.type} />
                    </Form.Field>
                    <Form.Field>
                      <label className="label-config">Descripcion</label>
                      <TextArea
                        disabled
                        type="text"
                        value={routineSelect.description}
                      />
                    </Form.Field>
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

function initialValues(date) {
  return {
    user: "",
    exercise: "",
    description: "",
    date: moment(date).format("YYYY-MM-DD"),
    series: "",
    reps: "",
    type: "",
  };
}

function validationSchema() {
  return {
    user: Yup.string().required(true),
    exercise: Yup.string().required(true),
    description: Yup.string().required(true),
    date: Yup.string().required(true),
    series: Yup.string().required(true),
    reps: Yup.string().required(true),
    type: Yup.string().required(true),
  };
}
