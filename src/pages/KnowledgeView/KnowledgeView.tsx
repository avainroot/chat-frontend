import { useContext } from "react";

import { TranslatorContext } from "@context";
import { BlankPage } from "@components";
import { HomeIcon } from "@assets/icons";
import { KnowledgeViewItem } from "./KnowledgeViewItem";
import { useParams } from "react-router-dom";

export const KnowledgeView = () => {
  const { translator } = useContext(TranslatorContext);

  const localisation = translator["knowledge"];

  const {item}: any = useParams();

  const getBreadcrumbItems = () => {
    return [
      {
        href: "/home",
        title: localisation.home_page,
        icon: <HomeIcon />,
      },
      {
        title: localisation.articles,
      },
    ];
  };

  return (
    <BlankPage breadcrumb={getBreadcrumbItems()}>
      <KnowledgeViewItem itemId={item}/>
    </BlankPage>
  );
};
