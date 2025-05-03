import { IconDashboard, IconListDetails, IconSettings, IconHelp, IconSearch, IconDatabase, IconReport, IconFileWord } from "@tabler/icons-react";
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
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: "Мої статті",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Мої питання",
        url: ROUTES.PERSONAL_QUESTIONS,
        icon: IconReport,
      },
      {
        name: "Мої відповіді",
        url: "#",
        icon: IconFileWord,
      },
    ]
};