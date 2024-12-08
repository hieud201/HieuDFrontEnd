// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BookOutlined from '@ant-design/icons/BookOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BookOutlined, PlusOutlined, SearchOutlined, EyeOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'books',
      title: <FormattedMessage id="books" />,
      type: 'collapse',
      icon: icons.BookOutlined,
      children: [
        {
          id: 'view-book',
          title: <FormattedMessage id="view-book" />,
          type: 'item',
          url: '/books/view',
          icon: icons.EyeOutlined
        },
        {
          id: 'search-book',
          title: <FormattedMessage id="search-book" />,
          type: 'item',
          url: '/books/search',
          icon: icons.SearchOutlined
        },
        {
          id: 'add-book',
          title: <FormattedMessage id="add-book" />,
          type: 'item',
          url: '/books/add',
          icon: icons.PlusOutlined
        }
      ]
    }
  ]
};

export default pages;