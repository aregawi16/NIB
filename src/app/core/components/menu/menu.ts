import { Menu } from './menu.model';

export const menuItems = [
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/', null, 'dashboard', null, false, 0),
     new Menu (20, 'ADMIN_NAV.APPLICANT_PROFILE', "auth/login", null, 'grid_on', null, true, 0),
     new Menu (30, 'ADMIN_NAV.CREATE_APPLICANT_PROFILE', "applicant-profile/create-new", null, 'add', null, false, 20),
     new Menu (30, 'ADMIN_NAV.LIST_APPLICANT_PROFILE', "applicant-profile/list", null, 'list', null, false, 20),
     new Menu (50, 'ADMIN_NAV.USER', "", null, 'person', null, true, 0),
     new Menu (510, 'ADMIN_NAV.USER', "/identity/user", null, 'person_add', null, false, 50),
     new Menu (520, 'ADMIN_NAV.ROLE', "/identity/role", null, 'person', null, false, 50),
    new Menu (70, 'ADMIN_NAV.SETTING', '', null, 'settings', null, true, 0),
    new Menu (710, 'ADMIN_NAV.JOB', '/setting/job', null, 'settings', null, false, 70),
    new Menu (710, 'ADMIN_NAV.COUNTRY', '/setting/country', null, 'location_on', null, false, 70),

]
