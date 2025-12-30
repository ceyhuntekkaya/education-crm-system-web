import Link from "next/link";
import { Button, Popover } from "@/components/ui";
import { useAuth } from "@/contexts";
import { Role } from "@/enums/Role";

const PanelMenu = () => {
  const { user, currentRole } = useAuth();

  // Paneller menüsü sadece COMPANY, SUPPLY ve ADMIN rollerinde görünsün
  const showPanelMenu =
    currentRole === Role.COMPANY ||
    currentRole === Role.SUPPLY ||
    currentRole === Role.ADMIN;

  if (!user || !showPanelMenu) {
    return null;
  }

  // Rol bazlı panel seçenekleri
  const allPanelOptions = [
    {
      id: "company-management",
      label: "Kurum Yönetimi",
      icon: "ph ph-buildings",
      href: "/company",
      description: "Kurumları görüntüle ve düzenle",
      color: "#487bff",
      bgColor: "rgba(72, 123, 255, 0.1)",
      allowedRoles: [Role.COMPANY, Role.ADMIN],
    },
    {
      id: "supply-panel",
      label: "Tedarik Paneli",
      icon: "ph ph-package",
      href: "/supply/supplier",
      description: "Tedarikçi işlemleri",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      allowedRoles: [Role.SUPPLY, Role.ADMIN],
    },
    // {
    //   id: "supply-management",
    //   label: "Kurum Tedarik Yönetimi",
    //   icon: "ph ph-shopping-cart",
    //   href: "/supply/company",
    //   description: "Malzeme ve tedarik talepleri",
    //   color: "#10b981",
    //   bgColor: "rgba(16, 185, 129, 0.1)",
    //   allowedRoles: [Role.COMPANY, Role.ADMIN],
    // },
  ];

  // Kullanıcının rolüne göre panelleri filtrele
  const panelOptions = allPanelOptions.filter((panel) =>
    panel.allowedRoles.includes(currentRole as Role)
  );

  // Hiç panel yoksa menüyü gösterme
  if (panelOptions.length === 0) {
    return null;
  }

  return (
    <div className="panel-menu-wrapper">
      <Popover
        placement="bottom-end"
        trigger="hover"
        content={
          <div className="panel-menu-popover-content">
            <div className="panel-menu-list">
              {panelOptions.map((panel) => (
                <Link
                  key={panel.id}
                  href={panel.href}
                  className="panel-menu-item"
                >
                  <div
                    className="panel-menu-item-icon"
                    style={{
                      color: panel.color,
                      backgroundColor: panel.bgColor,
                    }}
                  >
                    <i className={panel.icon}></i>
                  </div>
                  <div className="panel-menu-item-content">
                    <div className="panel-menu-item-label">{panel.label}</div>
                    <div className="panel-menu-item-description">
                      {panel.description}
                    </div>
                  </div>
                  <div className="panel-menu-item-arrow">
                    <i className="ph ph-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        }
      >
        <Button
          variant="inline"
          size="xs"
          leftIcon="ph ph-grid-four"
          className="panel-menu-trigger-btn"
        >
          <span className="panel-menu-trigger-text">Yönetim</span>
        </Button>
      </Popover>
    </div>
  );
};

export default PanelMenu;
