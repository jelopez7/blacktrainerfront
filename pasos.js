// Cuando se crea un courses se crea con los siguientes datos
course = {
  id: 29051259,
  active_to: null,
  name: "MUSCULACION: centrada en brazos",
  mission: null,
  template_id: null,
  length: 0,
  course_status: "published",
  handbook_tag_ids: [],
  selectable_handbook_tag_ids: [],
  created_at: "2025-01-31T00:54:45.618+03:00",
  pharmacy_available: false,
  sport_food_available: true,
  training_days_available: true,
  diet_available: true,
  executed_exercises: 0,
  progress_reset_at: null,
  schedule: 0,
  cyclic_schedule_start_on: null,
  cyclic_schedule_workout_days: null,
  cyclic_schedule_rest_days: null,
  changed_autodiet_coefficient: false,
  meal_count: null,
  goal: null,
  post_product_tag_ids: [],
  diet_type: "manual_diet",
};

(templates = [
  {
    id: 227,
    group_id: 1,
    title: "Musculación general",
    description:
      "Los deportistas profesionales saben que ganar masa muscular no es un proceso tan difícil y que incluso puede ser agradable, especialmente si lo comparamos con otros objetivos. Sin embargo, esto no significa que nuestros músculos vayan a crecer solos de un día para otro. Para lograr el resultado deseado, no solo necesitas entrenar duro, sino también controlar tu dieta y tus horarios de descanso. \r\n\r\nTampoco debemos olvidar que la masa muscular es masa de calidad, y no los kilos de más de los que todo el mundo quiere deshacerse. Haz que tus entrenamientos en el gimnasio sean más efectivos con nuestro programa de software que incluye ejercicios seleccionados para deportistas profesionales, así como recomendaciones de alimentación y nutrición deportiva. ¡Diviértete y cosecha los frutos de tu trabajo!",
    length: 2,
    weight: 9903,
    type: "target",
    training_for: "gym",
    author: "",
    available_with_repost: false,
    inapp_id: null,
    level: "profi",
    gender: "male",
    next_level_id: null,
    with_equipment: true,
    frequency: "three_times_a_week",
    selectable_handbook_tag_ids: [],
    created_at: "2022-09-21T03:34:20.670+03:00",
    updated_at: "2024-08-05T09:19:42.382+03:00",
    gp_inapp_id: null,
    categories: ["para hombre", "para gimnasio", "pro"],
    contents: [
      "33 días de entrenamiento (3 sesiones por semana)",
      "Guía específica de nutrición y planes de alimentación",
      "Suplementos deportivos recomendados",
    ],
    photo_url: null,
    photo_ext: null,
    full_photo_url: "/uploads/ma/file/585/2ff2763e759bdc8f",
    full_photo_ext: "jpg",
    photo:
      "https://cdn.fitnessonlineapp.com/uploads/ma/file/585/2ff2763e759bdc8f.jpg",
  },
]),
  // Cuando se guarda un dia se guarda los ejercicios y el dia ejemplo
  (exercises = [
    {
      id: 1778829673,
      status: "published",
      comment: null,
      training_day_id: 717345203,
      post_exercise_id: 860, // id del ejercicio
      weight_type: null,
      recommended_repeats: 0,
      recommended_max_weight_percent: 0.0,
      recommended_sets: 0,
      superset: 0,
      position: 1,
      created_at: "2025-01-31T00:37:16.009+03:00",
      deleted_at: null,
      recommended_weight_value: 0.0,
      rest_time: 120,
      alternative_post_exercise_ids: [],
      handbook_type: "power", // dependiendo del tipo cierto parametros se establece
      set_type: "straight",
    },
    {
      id: 1778835662,
      status: "published",
      comment: null,
      training_day_id: 717345203,
      post_exercise_id: 253,
      weight_type: null,
      recommended_repeats: 0,
      recommended_max_weight_percent: 0.0,
      recommended_sets: 0,
      superset: 0,
      position: 2,
      created_at: "2025-01-31T00:42:38.740+03:00",
      deleted_at: null,
      sets: 0,
      duration: 0,
      heart_rate: [0, 0],
      recommended_weight_value: 0.0,
      rest_time: 120,
      alternative_post_exercise_ids: [],
      handbook_type: "cardio", // dependiendo del tipo cierto parametros se establece
      set_type: "straight",
    },
  ]);
training_day = {
  id: 717345203,
  course_id: 29050336,
  title: "pierna-cudriceps-mas",
  percentage: null,
  unlocked: false,
  ready_to_unlock: false,
  unlocked_at: null,
  ios_activity_type: "crossTraining",
  ios_location_type: "indoor",
  status: "published",
  deleted_at: null,
  position: 0,
  estimated_duration: 0,
  skip_possibility: null,
  skip_unlocked_at: null,
  progress_reset_at: null,
  updated_at: "2025-01-31T00:37:16.014+03:00",
};

const diet = {
  meals: [],
  id: 27513128,
  course_id: 29051259,
  total_energy_value: null,
  protein_amount: null,
  fat_amount: null,
  carbohydrate_amount: null,
  common_advices: null,
  desired_fats_amount: null,
  desired_energy_value: null,
  desired_protein_amount: null,
  desired_carbohydrate_amount: null,
};

sport_food = {
  id: 92886372,
  post_sport_food_id: 16,
  comment: "",
};
