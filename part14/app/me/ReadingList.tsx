import { updateReadStatus } from "../actions/readingList";
import { getFilteredUserReadingLists } from "../services/readingLists";
import { Button } from "@/components/ui/button";

const ReadingList = async () => {
  const unread = await getFilteredUserReadingLists(false);
  const read = await getFilteredUserReadingLists(true);
  const noUnread = unread.length === 0;
  const noRead = read.length === 0;

  if (noUnread && noRead) {
    return (
      <div className="mt-10 text-2xl" data-testid="empty-reading-list">
        No items in your reading list
      </div>
    );
  }

  return (
    <div>
      <div className="mt-5" data-testid="unread-section">
        <h3 className="text-2xl">Unread</h3>

        {noUnread ? (
          <p data-testid="no-unread-blogs">No unread items</p>
        ) : (
          <ul>
            {unread.map((item) => (
              <li key={item.id} className="my-3 p-5 border">
                <p className="text-2xl">{item.blog.title}</p>
                <p className="text-2xl">{item.blog.author}</p>

                <form action={updateReadStatus}>
                  <input type="hidden" name="id" value={item.id} />
                  <Button
                    type="submit"
                    className="my-5"
                    data-testid="mark-read-"
                    variant={"secondary"}
                    size={"mySize"}
                  >
                    Mark as read
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-2xl">Read</h3>

        {noRead ? (
          <p className="text-xl">No read items</p>
        ) : (
          <ul>
            {read.map((item) => (
              <li key={item.id} className="my-3 p-5 border">
                <p className="text-2xl">{item.blog.title}</p>
                <p className="text-2xl">{item.blog.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReadingList;
