import { IconDashboard, IconListDetails, IconDatabase, IconReport, IconFileWord } from "@tabler/icons-react";
import { ROUTES } from "./routes.constants";

export const SIDEBAR_ITEMS = {
    navMain: [
      {
        title: "Усі статті",
        url: ROUTES.ARTICLES,
        icon: IconDashboard,
      },
      {
        title: "Усі питання",
        url: ROUTES.QUESTIONS,
        icon: IconListDetails,
      },
    ],
    navSecondary: [],
    documents: [
      {
        name: "Мої статті",
        url: ROUTES.PERSONAL_ARTICLES,
        icon: IconDatabase,
      },
      {
        name: "Мої питання",
        url: ROUTES.PERSONAL_QUESTIONS,
        icon: IconReport,
      },
    ]
};