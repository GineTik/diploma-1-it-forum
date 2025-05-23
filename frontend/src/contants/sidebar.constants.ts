import { IconDashboard, IconListDetails, IconDatabase, IconReport, IconSearch } from "@tabler/icons-react";
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
      {
        title: "Пошук",
        url: ROUTES.SEARCH,
        icon: IconSearch,
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