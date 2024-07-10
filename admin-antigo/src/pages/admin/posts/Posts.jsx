import { Link } from "react-router-dom";
import TablePosts from "../../../components/admin/posts/TablePosts";
import { useState, useEffect } from "react";
import { sendRequest, handleOnChange } from "../../../util/util";
import Loading from "../../../components/Loading";
import DeletePost from "../../../components/admin/posts/DeletePost";

export default function Posts() {
  const [postsData, setPostsData] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [deleteContainer, setDeleteContainer] = useState(() => {
    return {
      isActive: false,
      postName: "Post name to delete.",
      postId: 0,
      success: false,
    };
  });
  const [deleteLoading, setDeleteLoading] = useState(() => false);

  const [searchData, setSearchData] = useState(() => {
    return {
      data: {
        searchingFor: "",
      },
    };
  });

  useEffect(() => {
    getPosts(setPostsData, setIsLoading);
  }, []);

  const circleActive = true;

  return (
    <section>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={(event) => handleSearchingFor(event, searchData)}
            noValidate
            className="w-full"
          >
            <div className="flex w-full max-w-[30rem] items-center border rounded-lg border-customTransparent">
              <input
                onChange={(event) =>
                  handleOnChange(event.target, setSearchData)
                }
                type="text"
                name="searchingFor"
                value={searchData.data.searchingFor}
                className="p-2 pl-4 pr-4 text-base text-tertiary w-full"
                placeholder="O que você procura?"
              />
              <button
                className="cursor-pointer h-full p-2 pr-5 pl-5 inline-block rounded-r-lg bg-blue-900"
                type="submit"
              >
                <i className="icon-search text-lg text-white"></i>
              </button>
            </div>
          </form>

          <Link
            to="nova-rifa"
            className="p-2 w-fit text-nowrap pl-12 pr-12 bg-blue-900 hover:bg-blue-700 transition-all duration-200 text-white font-bold cursor-pointer rounded-lg"
          >
            Nova Rifa
          </Link>
        </div>

        {deleteContainer.isActive && (
          <DeletePost
            deleteLoading={deleteLoading}
            closeDeleteContainer={() =>
              closeDeleteContainer(setDeleteContainer)
            }
            handleDeletePost={() =>
              handleDeletePost(
                deleteContainer.postId,
                setDeleteContainer,
                setPostsData,
                setIsLoading,
                setDeleteLoading
              )
            }
            postName={deleteContainer.postName}
            success={deleteContainer.success}
          />
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loading usePrimary={true} />
          </div>
        ) : (
          <div>
            {postsData.length >= 1 ? (
              <div className="flex flex-col gap-6">
                <div className="w-full overflow-x-auto ">
                  <TablePosts
                    postsData={postsData}
                    handleDeleteContainer={(postName, postId) =>
                      handleDeleteContainer(
                        setDeleteContainer,
                        postName,
                        postId
                      )
                    }
                  />
                </div>

                <div className="flex items-center gap-3 justify-center">
                  <mark className="font-bold text-lg cursor-pointer inline-block text-tertiary hover:text-blue-900">
                    {"<<"}
                  </mark>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <mark
                        className={`w-8 h-8 flex font-medium ${
                          circleActive
                            ? "text-white bg-blue-900"
                            : "text-tertiary"
                        } hover:bg-blue-900 hover:text-white cursor-pointer transition-all duration-200 items-center justify-center rounded-full border border-customTransparent`}
                      >
                        1
                      </mark>
                      <mark className="w-8 h-8 flex font-medium text-tertiary hover:bg-blue-900 hover:text-white cursor-pointer transition-all duration-200 items-center justify-center rounded-full border border-customTransparent">
                        2
                      </mark>
                      <mark className="w-8 h-8 flex font-medium text-tertiary hover:bg-blue-900 hover:text-white cursor-pointer transition-all duration-200 items-center justify-center rounded-full border border-customTransparent">
                        3
                      </mark>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full border border-customTransparent bg-gray-100"></div>
                      <div className="w-2 h-2 rounded-full border border-customTransparent bg-gray-100"></div>
                      <div className="w-2 h-2 rounded-full border border-customTransparent bg-gray-100"></div>
                    </div>

                    <mark className="w-8 h-8 flex font-medium text-tertiary hover:bg-blue-900 hover:text-white cursor-pointer transition-all duration-200 items-center justify-center rounded-full border border-customTransparent">
                      10
                    </mark>
                  </div>

                  <div>
                    <mark className="font-bold text-lg cursor-pointer inline-block text-tertiary hover:text-blue-900">
                      {">>"}
                    </mark>
                  </div>
                </div>
              </div>
            ) : (
              <h2 className="text-2xl text-center text-red-500 font-bold ">
                Nenhuma rifa encontrado
              </h2>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function handleSearchingFor(event, searchData) {
  event.preventDefault();


}

async function getPosts(setPostsData, setIsLoading) {
  const requestData = {
    method: "GET",
    url: "rifas",
  };

  setIsLoading(() => true);

  try {
    const response = await sendRequest(requestData);

    if (!response.success) {
      return;
    }

    setPostsData(() => response.data);
  } catch (error) {
    window.alert(`Houve um erro no servidor. ${error}`);
  } finally {
    setIsLoading(() => false);
  }
}

function closeDeleteContainer(setDeleteContainer) {
  setDeleteContainer((prevDeleteContainer) => {
    return { ...prevDeleteContainer, isActive: false, success: false };
  });
}

function handleDeleteContainer(setDeleteContainer, postName, postId) {
  setDeleteContainer((prevDeleteContainer) => {
    return {
      postName,
      isActive: true,
      postId,
      success: false,
    };
  });
}

async function handleDeletePost(
  id,
  setDeleteContainer,
  setPostsData,
  setIsLoading,
  setDeleteLoading
) {
  const requestData = {
    method: "DELETE",
    url: `rifas/${id}`,
  };

  try {
    setDeleteLoading(() => true);
    const response = await sendRequest(requestData);

    if (!response.success) {
      throw new Error(response.msg);
    }

    setDeleteContainer((prevDeleteContainer) => {
      return {
        ...prevDeleteContainer,
        success: true,
      };
    });

    getPosts(setPostsData, setIsLoading);
  } catch (error) {
    window.alert(`Houve um erro no servidor. ${error}`);
  } finally {
    setDeleteLoading(() => false);
  }
}
