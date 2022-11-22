import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { doGet, doPost } from "./Service";
import { toast, ToastContainer } from "react-toastify";
import { useRef } from "react";

const addUserValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  city: "",
  country: "",
  skype: "",
  whatsapp: "",
  telegram: "",
  facebook: "",
  instagram: "",
};

const UserList = () => {
  const [page, setPage] = useState(1);
  const [userListTotal, setUserListTotal] = useState(null);
  const [userlist, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [addUserDetails, setAddUserDetails] = useState(addUserValues);
  const [serchUserName, setSearchUserName] = useState("");
  const setRefLastName = useRef(null);
  const setRefUserName = useRef(null);
  const setRefEmail = useRef(null);
  const setRefCity = useRef(null);
  const setRefCountry = useRef(null);
  const setRefSkype = useRef(null);
  const setRefWhatsapp = useRef(null);
  const setReftelegram = useRef(null);
  const setRefFacebook = useRef(null);
  const setRefInstagram = useRef(null);

  const limit = 5;

  useEffect(() => {
    setIsActive(true);
    doGet(`userlist?page=${page}&limit=${limit}`)
      .then((data) => {
        if (data?.response_code === 0) {
          setUserList(data?.response?.results);
          setUserListTotal(data?.response?.totalLength);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.response_message);
      });
  }, [page, limit]);

  useEffect(() => {
    let filterData = userlist.filter((value) => {
      return value.userName.toLowerCase().includes(serchUserName.toLowerCase());
    });
    setFilteredUserList(filterData);
  }, [serchUserName]);

  const activeHandler = () => {
    setIsActive(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUserDetails({
      ...addUserDetails,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    const { keyCode, target } = e;
    const { name } = target;

    switch (keyCode === 13 && name) {
      case "firstName":
        setRefLastName.current.focus();
        break;
      case "lastName":
        setRefUserName.current.focus();
        break;
      case "userName":
        setRefEmail.current.focus();
        break;
      case "email":
        setRefCity.current.focus();
        break;
      case "city":
        setRefCountry.current.focus();
        break;
      case "country":
        setRefSkype.current.focus();
        break;
      case "skype":
        setRefWhatsapp.current.focus();
        break;
      case "whatsapp":
        setReftelegram.current.focus();
        break;
      case "telegram":
        setRefFacebook.current.focus();
        break;
      case "facebook":
        setRefInstagram.current.focus();
        break;
      case "instagram":
        {
          if (
            addUserDetails.firstName &&
            addUserDetails.lastName &&
            addUserDetails.userName &&
            addUserDetails.city &&
            addUserDetails.email &&
            addUserDetails.skype &&
            addUserDetails.facebook &&
            addUserDetails.telegram &&
            addUserDetails.instagram &&
            addUserDetails.whatsapp
          ) {
            return doPost("userlist/add", addUserDetails)
              .then((data) => {
                if (data?.response_code === 0) {
                  toast.success("user added successfully");
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 1200);
                }
              })
              .catch((err) =>
                toast.error(err?.response?.data?.response_message)
              );
          } else {
            toast.error("All credentials needed to add user");
          }
        }
        break;
      default:
        break;
    }
  };

  const pageChange = (event) => {
    setPage(event.selected + 1);
  };

  const handleSearch = (e) => {
    setSearchUserName(e.target.value);
  };

  const sortUserListHandler = (format) => {
    let sortedUserList;
    switch (format) {
      case "asc":
        sortedUserList = [...userlist].sort((a ,b) => {
          return a.id - b.id
        })
        setUserList(sortedUserList)
        break;
      case "dec":
        sortedUserList =[...userlist].sort((a ,b) => {
          return b.id - a.id;
        })
        setUserList(sortedUserList)
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <div className="userlist">
        <div className="table-holder">
          {(userlist.length >= 1 && filteredUserList?.length === 0) ||
            (userlist?.length === 0 && filteredUserList?.length >= 1 && (
              <div className="d-flex justify-content-center m-3 py-3">
                <h5>No data found</h5>
              </div>
            ))}
          <table
            id="dtBasicExample"
            class="table table-striped table-bordered table-sm"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th class="th-sm">Id</th>
                <th class="th-sm">firstName</th>
                <th class="th-sm">lastName</th>
                <th class="th-sm">userName</th>
                <th class="th-sm">email</th>
                <th class="th-sm">city</th>
                <th class="th-sm">country</th>
                <th class="th-sm">skype</th>
                <th class="th-sm">whatsapp</th>
                <th class="th-sm">telegram</th>
                <th class="th-sm">facebook</th>
                <th class="th-sm">instagram</th>
              </tr>
            </thead>
            <tbody>
              {userlist.length >= 1 &&
                filteredUserList.length === 0 &&
                userlist.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>{item.city}</td>
                      <td>{item.country}</td>
                      <td>{item.skype}</td>
                      <td>{item.whatsapp}</td>
                      <td>{item.telegram}</td>
                      <td>{item.facebook}</td>
                      <td>{item.instagram}</td>
                    </tr>
                  );
                })}

              {filteredUserList.length >= 1 &&
                filteredUserList.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>{item.city}</td>
                      <td>{item.country}</td>
                      <td>{item.skype}</td>
                      <td>{item.whatsapp}</td>
                      <td>{item.telegram}</td>
                      <td>{item.facebook}</td>
                      <td>{item.instagram}</td>
                    </tr>
                  );
                })}

              <tr>
                <td onDoubleClick={activeHandler}></td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="firstName"
                    name="firstName"
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.firstName}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="lastName"
                    ref={setRefLastName}
                    name="lastName"
                    values={addUserDetails?.lastName}
                    onKeyUp={(e) => handleKeyPress(e)}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="userName"
                    name="userName"
                    onKeyUp={(e) => handleKeyPress(e)}
                    ref={setRefUserName}
                    value={addUserDetails?.userName}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="email"
                    name="email"
                    ref={setRefEmail}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.email}
                    onChange={(e) => handleChange(e)}
                    style={{ width: "200px" }}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="city"
                    name="city"
                    ref={setRefCity}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.city}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="country"
                    name="country"
                    ref={setRefCountry}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.country}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="skype"
                    name="skype"
                    ref={setRefSkype}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.skype}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="whatsapp"
                    name="whatsapp"
                    ref={setRefWhatsapp}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.whatsapp}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="telegram"
                    name="telegram"
                    ref={setReftelegram}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.telegram}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="facebook"
                    name="facebook"
                    ref={setRefFacebook}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.facebook}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
                <td>
                  <input
                    disabled={isActive}
                    placeholder="instagram"
                    name="instagram"
                    ref={setRefInstagram}
                    onKeyUp={(e) => handleKeyPress(e)}
                    value={addUserDetails?.instagram}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination-style">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={pageChange}
            pageRangeDisplayed={5}
            pageCount={userListTotal / limit}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
        <div className="serach-content-part">
          <label style={{ marginRight: "30px" }}>Search By userName</label>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort Button
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <span class="dropdown-item" onClick={() => sortUserListHandler("asc")}>
              A - Z
            </span>
            <span class="dropdown-item" onClick={() => sortUserListHandler("dec")}>
              Z - A
            </span>
          </div>
        </div>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default UserList;
