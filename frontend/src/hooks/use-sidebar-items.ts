import { ROUTES } from "@/contants/routes.constants";
import { IconDashboard, IconListDetails, IconCamera, IconFileDescription, IconFileAi, IconSettings, IconHelp, IconSearch, IconDatabase, IconReport, IconFileWord } from "@tabler/icons-react"

export const useSidebarItems = () => {
    const data = {
        navMain: [
          {
            title: "Усі статті",
            url: ROUTES.POSTS,
            icon: IconDashboard,
          },
          {
            title: "Усі питання",
            url: ROUTES.QUESTIONS,
            icon: IconListDetails,
          },
        ],
        navClouds: [
          {
            title: "Capture",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
              {
                title: "Active Proposals",
                url: "#",
              },
              {
                title: "Archived",
                url: "#",
              },
            ],
          },
          {
            title: "Proposal",
            icon: IconFileDescription,
            url: "#",
            items: [
              {
                title: "Active Proposals",
                url: "#",
              },
              {
                title: "Archived",
                url: "#",
              },
            ],
          },
          {
            title: "Prompts",
            icon: IconFileAi,
            url: "#",
            items: [
              {
                title: "Active Proposals",
                url: "#",
              },
              {
                title: "Archived",
                url: "#",
              },
            ],
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
            url: "#",
            icon: IconReport,
          },
          {
            name: "Мої відповіді",
            url: "#",
            icon: IconFileWord,
          },
        ],
    }

    return data;
}