// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';


// type
import { NavItemType } from 'types/menu';

// icons
const icons = { MessageOutlined, EmailIcon, SendIcon, BookOutlined, DeleteOutlined, PlusOutlined, SearchOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'messages',
      title: <FormattedMessage id="messages" />,
      type: 'collapse',
      icon: icons.MessageOutlined,
      children: [
        {
          id: 'send-message',
          title: <FormattedMessage id="send-message" />,
          type: 'item',
          url: '/messages/send',
          icon: icons.SendIcon
        },
        {
          id: 'view-messages',
          title: <FormattedMessage id="view-messages" />,
          type: 'item',
          url: '/messages/list',
          icon: icons.EmailIcon
        }
      ]
    },
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
          icon: icons.SearchOutlined
        },
        {
          id: 'add-book',
          title: <FormattedMessage id="add-book" />,
          type: 'item',
          url: '/books/add',
          icon: icons.PlusOutlined
        },
        {
          id: 'delete-book',
          title: <FormattedMessage id="delete-book" />,
          type: 'item',
          url: '/books/delete',
          icon: icons.DeleteOutlined
        }
      ]
    }
  ]
};

export default pages;
